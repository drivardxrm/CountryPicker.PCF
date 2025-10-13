import { useQuery } from '@tanstack/react-query'
import { Country } from "../models/Country";
import { getAllCountries, GetCountryName } from "../utils/CountryUtils";
import { useViewModel } from "../services/ViewModelProvider";
import { asComboboxOptions } from "../utils/ComboBoxUtils";
import { IComboBoxOption } from '@fluentui/react';


// returns all the countries
const useAllCountries = () => {
  const vm = useViewModel(); 

  const { data, status, error, isFetching } = 
    useQuery<Country[], Error>(
        {
          queryKey: ["countries", vm.instanceid],
          queryFn: () => getAllCountries(),
          staleTime: Infinity
        }
      )
    

  return {countries:data, status, error, isFetching}
}

// returns the filtered countries based in view model
const useFilteredCountries = () => {
  
  const vm = useViewModel(); 

  const { countries, status, error, isFetching } = useAllCountries();

  const filterdcountries = countries?.filter(c => vm.limit === undefined || vm.limit.includes(c.cca3)) //Filter 

  return {countries:filterdcountries, status, error, isFetching}
}




//PUBLIC Hooks
export const useCountryOptions = () => {
  const vm = useViewModel(); 

  const { countries, status, error, isFetching } = useFilteredCountries();

  const options = countries ? asComboboxOptions(countries,vm) : undefined;

  return {options,status, error, isFetching};

}

export const useCountry = (code:string) => {

  const vm = useViewModel();

  const { countries, status, error, isFetching } = useAllCountries();

  const country = countries?.find((country) => country.cca3 === code)

  return {country,status, error, isFetching};

}


export const useSelectedCountry = () => {

  const vm = useViewModel();

  const { countries, status, error, isFetching } = useFilteredCountries();

  const selectedcountry = countries?.find((country) => country.cca3 === vm.countrycode)

  return {selectedcountry,status, error, isFetching};


}


export const useSelectedOption = () => {

  const vm = useViewModel();

  const { selectedcountry, status, error, isFetching } = useSelectedCountry();

  const selectedoption:IComboBoxOption|undefined = selectedcountry ? 
        {
          key:selectedcountry.cca3,
          text:GetCountryName(selectedcountry,vm.language),
          data:{cca2:selectedcountry.cca2}
        } :
        undefined;
  

  return {selectedoption,status, error, isFetching};

}

  



  
  
