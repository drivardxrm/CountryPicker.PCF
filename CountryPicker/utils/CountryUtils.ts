
import { Country } from "../models/Country";
import countriesData from '../countries_data.json';

export const getAllCountries = async ():Promise<Country[]> => {
    
    //json data file was generated from : https://restcountries.com/v3.1/all?fields=name,flags,cca3,cca2,translations
    return countriesData as Country[];
  
};


// export const getCountryPickerOptions = async (
//     language:"en" | "de" | "es" | "fr" | "ja" | "it" | "pt" | "nl" | "fa",
//     filter:string[]|undefined,
//     promoted:string[] | undefined):Promise<Country[]> => {
    
//     //json data file was generated from : https://restcountries.com/v3.1/all?fields=name,flags,cca3,cca2,translations
//     let countries = [...countriesData] as Country[];
    
//     const result = countries
//                 .filter(c => filter === undefined || filter.includes(c.cca3)) //Filter 
//                 .sort(sortByCountryName(language)) //Sort by name
//                 .sort(sortByPromoted(promoted)); //Sort by promoted list

//     return result;
  
// };


//Sort functions for countries
export function sortByCountryName(language:"en" | "de" | "es" | "fr" | "ja" | "it" | "pt" | "nl" | "fa") {
    return function (a:Country,b:Country):number {

        let nameA = GetCountryName(a,language);
        let nameB = GetCountryName(b,language);

        if (nameA > nameB) return 1;
        if (nameB > nameA) return -1;
  
        return 0;
    };
}
  
// Bubble up 'promoted' keys list to be on top. 
export function sortByPromoted(promoted:string[] | undefined) {
    return function (a:Country,b:Country):number {

        const last = promoted?.length ?? 0;
        const keya = a.cca3.toString();
        const keyb = b.cca3.toString();

        const ranka = promoted?.includes(keya) ? promoted.indexOf(keya) : last;
        const rankb = promoted?.includes(keyb) ? promoted.indexOf(keyb) : last;
            
        if (ranka > rankb) return 1;
        if (rankb > ranka) return -1;
        
        return 0;
    };
}



export const GetCountryName = (country:Country | undefined, language:string):string => {
    if(!country){
        return "";
    }
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




