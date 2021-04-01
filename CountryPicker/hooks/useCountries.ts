import { QueryObserverResult, useQuery } from "react-query";
import axios from "axios";
import { Country } from "../models/Country";
import { IComboBoxOption } from "@fluentui/react/lib/ComboBox";
import { GetCountryName } from "../utils/CountryUtils";





const getCountries = async (limit: string[] | undefined, promoted: string[] | undefined, language:string):Promise<IComboBoxOption[]> => {
  //If country list is limited, Fetch only the needed countries
  console.log("--fetching countries--");

  const { data } = limit?.some
    ? await axios.get<Country[]>("https://restcountries.eu/rest/v2/alpha?fields=name;alpha3Code;translations&codes=" + limit.join(";"))
    : await axios.get<Country[]>("https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;translations");

  const options = data.map(c => (
    {
      key:c.alpha3Code,
      text:GetCountryName(c,language)
    }
  ))
  .sort(sortByCountryName)  //sort by name

  if(promoted?.some){
    options.sort(sortByPromoted(promoted))
  }
  
  return options;
};



//Sort functions for combobox options
const sortByCountryName = (a:IComboBoxOption,b:IComboBoxOption):number => {

  if (a.text > b.text) return 1;
  if (b.text > a.text) return -1;

  return 0;
}

// const sortByPromoted = (a:IComboBoxOption,b:IComboBoxOption):number => {
//   let ranka = promotedRank(a.key);
//   let rankb = promotedRank(b.key);
     
//   if (ranka > rankb) return 1;
//   if (rankb > ranka) return -1;

//   return 0;
// }

function sortByPromoted(promoted:string[]) {
  return function (a:IComboBoxOption,b:IComboBoxOption):number {
    let ranka = promoted?.indexOf(a.key.toString()) ?? 0;
    let rankb = promoted?.indexOf(b.key.toString()) ?? 0;
         
    if (ranka > rankb) return 1;
    if (rankb > ranka) return -1;
    
    return 0;
  };
}

// Rank of a given country compared to the 'promoted' countri list. 
//Ex. promoted = [USA,CAN,MEX], USA=1, CAN=2, MEX=3, COL=0. If promoted is empty rank = 0 for all countries
// const promotedRank = (promoted:string[],countrykey:string | number):Number => {

//   var last = promoted?.length ?? 0;
//   var rank = promoted?.indexOf(countrykey.toString()) ?? last;
//   return rank < 0 ? last : rank;
// }




export const useCountries = (limit: string[] | undefined, promoted: string[] | undefined, language:string): QueryObserverResult<IComboBoxOption[], unknown> =>
  useQuery(["countries", { limit }], () => getCountries(limit,promoted,language));
