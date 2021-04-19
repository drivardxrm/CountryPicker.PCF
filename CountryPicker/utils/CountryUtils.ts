
import axios from "axios";
import { Country } from "../models/Country";

export const getAllCountries = async ():Promise<Country[]> => {
    
    console.log("--fetching all countries--");
  
    //If country list is limited, Fetch only the needed countries
    const { data } = await axios.get<Country[]>("https://restcountries.eu/rest/v2/all");
  
    return data;
    
};

export const getCountries = async (limit: string[] | undefined):Promise<Country[]> => {
    
    console.log("--fetching countries--" + limit?.join(";") ?? "");
  
    //If country list is limited, Fetch only the needed countries
    const { data } = limit?.some
      ? await axios.get<Country[]>("https://restcountries.eu/rest/v2/alpha?codes=" + limit.join(";"))
      : await axios.get<Country[]>("https://restcountries.eu/rest/v2/all");
  
    return data;
    
  };

export const GetFlagUrl = (key:string|number|undefined):string => 
        "https://restcountries.eu/data/" + key?.toString().toLowerCase() + ".svg"

export const GetCountryName = (country:Country, language:string):string => {

    let name = "";
    switch (language){
        case "en":
             name = country.name;  
             break;        
        case "de":
            name = country.translations.de ?? country.name;
            break;
        case "es":
            name = country.translations.es ?? country.name;
            break;
        case "fr":
            name = country.translations.fr ?? country.name;
            break;
        case "ja":
            name = country.translations.ja ?? country.name;
            break;
        case "it":
            name = country.translations.it ?? country.name;
            break;
        case "pt":
            name = country.translations.pt ?? country.name;
            break;
        case "nl":
            name = country.translations.nl ?? country.name;
            break;
        case "fa":
            name = country.translations.fa ?? country.name;
            break;
        default:
            name = country.name;
    }
    //in case one of the translation is empty, default to country.name
    if(name == ""){
        name = country.name;
    }
    return name;
}




