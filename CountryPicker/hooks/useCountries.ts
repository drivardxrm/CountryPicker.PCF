import { QueryObserverResult, useQuery } from "react-query";
import axios from "axios";
import { Country } from "../models/Country";


const getCountries = async (limit: string[] | undefined):Promise<Country[]> => {
  //If country list is limited, Fetch only the needed countries
  console.log("--fetching countries--")
  const { data } = limit
    ? await axios.get<Country[]>("https://restcountries.eu/rest/v2/alpha?codes=" + limit.join(";"))
    : await axios.get<Country[]>("https://restcountries.eu/rest/v2/all");

  return data;
};

export const useCountries = (limit: string[] | undefined): QueryObserverResult<Country[], unknown> =>
  useQuery(["countries", { limit }], () => getCountries(limit));
