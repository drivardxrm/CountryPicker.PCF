
import CountryInfoPanel from "../components/CountryInfoPanel";
import { Country } from "../models/Country";


export const GetCountry = (countries:Country[],countrykey:undefined|string|number) : Country | undefined => {
        
    var selectedCountry = countries.filter(c => c.alpha3Code === countrykey);
    return selectedCountry.length === 0 ? undefined : selectedCountry[0];
}

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




