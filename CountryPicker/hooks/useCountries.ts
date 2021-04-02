import { QueryObserverResult, useQuery } from "react-query";
import axios from "axios";
import { Country } from "../models/Country";
import { IComboBoxOption } from "@fluentui/react/lib/ComboBox";
import { GetCountryName } from "../utils/CountryUtils";
import { sortByOptionText, sortByPromoted } from "../utils/ComboBoxUtils";





const getCountries = async (limit: string[] | undefined, promoted: string[] | undefined, language:string):Promise<IComboBoxOption[]> => {
  //If country list is limited, Fetch only the needed countries
  console.log("--fetching countries--");

  //fetch data from external api
  const { data } = limit?.some
    ? await axios.get<Country[]>("https://restcountries.eu/rest/v2/alpha?fields=name;alpha3Code;translations&codes=" + limit.join(";"))
    : await axios.get<Country[]>("https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;translations");

  //Convert to combobox options
  const options = data.map(c => (
    {
      key:c.alpha3Code,
      text:GetCountryName(c,language)
    }
  ))
  .sort(sortByOptionText)  //sort by name

  if(promoted?.some){
    options.sort(sortByPromoted(promoted)) //sort by promoted
  }
  
  return options;
};


export const useCountries = (limit: string[] | undefined, promoted: string[] | undefined, language:string): QueryObserverResult<IComboBoxOption[], unknown> =>
  useQuery(["countries", { limit }],
           () => getCountries(limit,promoted,language));
