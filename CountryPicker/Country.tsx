//Extracted interface from this API : https://restcountries.eu/rest/v2/all

export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

export interface Translations {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
}

export interface RegionalBloc {
    acronym: string;
    name: string;
    otherAcronyms: string[];
    otherNames: string[];
}

export interface Country {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: number;
    latlng: number[];
    demonym: string;
    area?: number;
    gini?: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    currencies: Currency[];
    languages: Language[];
    translations: Translations;
    flag: string;
    regionalBlocs: RegionalBloc[];
    cioc: string;
}

//Utility functions
export const GetFlagUrl = (key:string|number|undefined):string => 
        "https://restcountries.eu/data/" + key?.toString().toLowerCase() + ".svg"

export const GetCountryName = (country:Country, language:"en" | "de" | "es" | "fr" | "ja" | "it" | "br" | "pt" | "nl" | "hr" | "fa"):string => {
    switch (language){
        case "en":
            return country.name;          
        case "de":
            return country.translations.de ?? country.name;
        case "es":
            return country.translations.es ?? country.name;
        case "fr":
            return country.translations.fr ?? country.name;
        case "ja":
            return country.translations.ja ?? country.name;
        case "it":
            return country.translations.it ?? country.name;
        case "br":
            return country.translations.br ?? country.name;
        case "pt":
            return country.translations.pt ?? country.name;
        case "nl":
            return country.translations.nl ?? country.name;
        case "fa":
            return country.translations.fa ?? country.name;
        default:
            return country.name;
    }
}



