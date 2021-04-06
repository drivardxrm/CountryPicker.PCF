import { QueryObserverResult, useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { Country } from "../models/Country";
import { IComboBoxOption } from "@fluentui/react/lib/ComboBox";
import { GetCountryName } from "../utils/CountryUtils";
import { sortByOptionText, sortByPromoted } from "../utils/ComboBoxUtils";
import { useViewModel } from "../services/ViewModelProvider";





const getCountries = async (limit: string[] | undefined):Promise<Country[]> => {
  //If country list is limited, Fetch only the needed countries
  console.log("--fetching countries--");

  //fetch data from external api
  const { data } = limit?.some
    ? await axios.get<Country[]>("https://restcountries.eu/rest/v2/alpha?codes=" + limit.join(";"))
    : await axios.get<Country[]>("https://restcountries.eu/rest/v2/all");

  return data;
  
};

const asComboboxOptions = (data:Country[],promoted: string[] | undefined, language:string) => data.map(c => (
  {
    key:c.alpha3Code,
    text:GetCountryName(c,language)
  }
))
.sort(sortByOptionText)
.sort(sortByPromoted(promoted));

const useCountries = (select:any):UseQueryResult<any,unknown> => {
  const vm = useViewModel();
  
  return useQuery(["countries"],
            () => getCountries(vm.limit),
            {select});
}


//public hooks

export const useCountriesAsOptions = (): UseQueryResult<IComboBoxOption[], unknown> => {
  const vm = useViewModel();

  return useCountries((data:Country[]) => asComboboxOptions(data,vm.promoted,vm.language));
}

export const useCountry = (countrycode:string):UseQueryResult<Country, unknown> => 
  useCountries((data:Country[]) => 
    data.find((country) => 
      country.alpha3Code === countrycode))


  
  
