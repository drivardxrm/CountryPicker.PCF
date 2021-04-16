import { useQuery, UseQueryResult } from "react-query";
import { Country } from "../models/Country";
import { IComboBoxOption } from "@fluentui/react/lib/ComboBox";
import { getCountries, GetCountryName } from "../utils/CountryUtils";
import { useViewModel } from "../services/ViewModelProvider";
import { asComboboxOptions } from "../utils/ComboBoxUtils";


//main generic query. you can pass a selector function or leave blank
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


export const useSelectedCountry = ():UseQueryResult<Country | undefined, unknown> => {

  const vm = useViewModel();

  return useCountries(
    (data:Country[]) => 
      data.find((country) => country.alpha3Code === vm.countrycode));
}


export const useSelectedCountryAsOption = (): UseQueryResult<IComboBoxOption | undefined, unknown> => {
  const vm = useViewModel();

  return useCountries(
    (data:Country[]) => {
      const selectedcountry = data.find((country) => country.alpha3Code === vm.countrycode);
      if(selectedcountry){
        return {
          key:selectedcountry.alpha3Code,
          text:GetCountryName(selectedcountry,vm.language)
        }
      }
      return undefined
    }
  )
}
  



  
  
