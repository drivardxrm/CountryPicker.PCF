import { useQuery } from '@tanstack/react-query'
import { Country } from "../models/Country";
import { getAllCountries, GetCountryName } from "../utils/CountryUtils";
import { useViewModel } from "../services/ViewModelProvider";
import { asComboboxOptions } from "../utils/ComboBoxUtils";
import { IComboBoxOption } from '@fluentui/react';


// returns all the countries
const useAllCountries = () => {
  
  const { data, isLoading, isError } = useQuery<Country[],Error>(["countries"],
            () => getAllCountries());

  return {countries:data, isLoading, isError}
}

// returns the filtered countries based in view model
const useFilteredCountries = () => {
  
  const vm = useViewModel(); 

  const { countries, isLoading, isError } = useAllCountries();

  const filterdcountries = countries?.filter(c => vm.limit === undefined || vm.limit.includes(c.cca3)) //Filter 

  return {countries:filterdcountries, isLoading, isError}
}




//PUBLIC Hooks
export const useCountryOptions = () => {
  const vm = useViewModel(); 

  const { countries, isLoading, isError } = useFilteredCountries();

  const options = countries ? asComboboxOptions(countries,vm) : undefined;

  return {options,isLoading,isError};

}

export const useCountry = (code:string) => {

  const vm = useViewModel();

  const { countries, isLoading, isError } = useAllCountries();

  const country = countries?.find((country) => country.cca3 === code)

  return {country,isLoading,isError};

}


export const useSelectedCountry = () => {

  const vm = useViewModel();

  const { countries, isLoading, isError } = useFilteredCountries();

  const selectedcountry = countries?.find((country) => country.cca3 === vm.countrycode)

  return {selectedcountry,isLoading,isError};


}


export const useSelectedOption = () => {

  const vm = useViewModel();

  const { selectedcountry, isLoading, isError } = useSelectedCountry();

  const selectedoption:IComboBoxOption|undefined = selectedcountry ? 
        {
          key:selectedcountry.cca3,
          text:GetCountryName(selectedcountry,vm.language),
          data:{cca2:selectedcountry.cca2}
        } :
        undefined;
  

  return {selectedoption,isLoading,isError};

}

  



  
  
