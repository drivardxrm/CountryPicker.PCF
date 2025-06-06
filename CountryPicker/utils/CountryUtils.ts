
import axios from "axios";
import { Country } from "../models/Country";

/// 2025-06-05 THERE is now a 10 fields limit on the API
export const getAllCountries = async ():Promise<Country[]> => {
    
    //console.log("--fetching all countries--");
  
    //If country list is limited, Fetch only the needed countries
    const { data } = await axios.get<Country[]>("https://restcountries.com/v3.1/all?fields=name,flags,cca3,cca2,translations");
  
    return data;
    
};

export const GetCountryName = (country:Country, language:string):string => {

    let name = "";
    switch (language){
        case "en":
             name = country.name.common;  
             break;        
        case "de":
            name = country.translations.deu?.common ?? country.name.common;
            break;
        case "es":
            name = country.translations.spa?.common ?? country.name.common;
            break;
        case "fr":
            name = country.translations.fra?.common ?? country.name.common;
            break;
        case "ja":
            name = country.translations.jpn?.common ?? country.name.common;
            break;
        case "it":
            name = country.translations.ita?.common ?? country.name.common;
            break;
        case "pt":
            name = country.translations.por?.common ?? country.name.common;
            break;
        case "nl":
            name = country.translations.nld?.common ?? country.name.common;
            break;
        case "fa":
            name = country.translations.ara?.common ?? country.name.common;
            break;
        default:
            name = country.name.common;
    }
    //in case one of the translation is empty, default to country.name
    if(name == ""){
        name = country.name.common;
    }
    return name;
}




