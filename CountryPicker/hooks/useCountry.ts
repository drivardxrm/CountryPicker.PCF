import { QueryObserverResult, useQuery } from "react-query";
import axios from "axios";
import { Country } from "../models/Country";


const getCountry = async (countrycode:string):Promise<Country> => {

  console.log("--fetching country : " + countrycode + "--")
  const {data} = await axios.get<Country>("https://restcountries.eu/rest/v2/alpha/" + countrycode)

  return data;
};

export const useCountry = (countrycode:string): QueryObserverResult<Country, unknown> =>
  useQuery(["country", { countrycode }],          
            () => getCountry(countrycode),      
            {enabled: countrycode?.length > 1}); //enabled switch = will only be called when there is a country passed and the panel is opened
