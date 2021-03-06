import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Country } from "../models/Country";
import { getAllCountries, GetCountryName } from "../utils/CountryUtils";
import { useViewModel } from "../services/ViewModelProvider";
import { asComboboxOptions } from "../utils/ComboBoxUtils";


const useCountries = () => {
  
  const vm = useViewModel(); 

  const { data, isLoading, isError } = useQuery<Country[],Error>(["countries"],
            () => getAllCountries());

  const filterdcountries = data?.filter(c => vm.limit === undefined || vm.limit.includes(c.alpha3Code)) //Filter 

  return {countries:filterdcountries, isLoading, isError}
}


//PUBLIC Hooks
export const useCountryOptions = () => {
  const vm = useViewModel(); 

  const { countries, isLoading, isError } = useCountries();

  const options = countries ? asComboboxOptions(countries,vm) : undefined;

  return {options,isLoading,isError};

}

export const useSelectedCountry = () => {

  const vm = useViewModel();

  const { countries, isLoading, isError } = useCountries();

  const selectedcountry = countries?.find((country) => country.alpha3Code === vm.countrycode)

  return {selectedcountry,isLoading,isError};


}


export const useSelectedOption = () => {

  const vm = useViewModel();

  const { selectedcountry, isLoading, isError } = useSelectedCountry();

  const selectedoption = selectedcountry ? 
        {
          key:selectedcountry.alpha3Code,
          text:GetCountryName(selectedcountry,vm.language)
        } :
        undefined;
  

  return {selectedoption,isLoading,isError};

}

  



  
  
