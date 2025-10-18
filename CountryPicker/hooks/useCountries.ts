import { useQuery } from '@tanstack/react-query'
import { useViewModel } from '../services/ViewModelProvider'
import { Country } from '../models/Country'
import { getAllCountries } from '../utils/CountryUtils'



const useAllCountries = () => {
  const vm = useViewModel()

  const { data, status, error, isFetching } =
    useQuery<Country[], Error>(
      {
        queryKey: ['countries', vm.instanceid],
        queryFn: () => getAllCountries(),
        staleTime: Infinity
      }
    )

  return {
    countries: data,
    status, error, isFetching
  }
}

// returns the filtered countries based in view model
export const useFilteredCountries = () => {
  
  const vm = useViewModel(); 

  const { countries, status, error, isFetching } = useAllCountries();

  const filterdcountries = countries?.filter(c => vm.limit === undefined || vm.limit.includes(c.cca3)) //Filter 

  return {countries:filterdcountries, status, error, isFetching}
}