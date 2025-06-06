//Extracted interface from this API : https://restcountries.com/v3.1/all?fields=name,flags,cca3,cca2,capital,region,subregion,translations,population,timezones,currencies,borders,idd,languages

export interface Country {
    flags: Flags;
    name: Name;
    cca3: string;
    cca2: string;
    translations: Translations;
}

interface Translations {
    ara: Name;
    bre: Name;
    ces: Name;
    cym: Name;
    deu: Name;
    est: Name;
    fin: Name;
    fra: Name;
    hrv?: Name;
    hun: Name;
    ita: Name;
    jpn?: Name;
    kor: Name;
    nld: Name;
    per?: Name;
    pol: Name;
    por: Name;
    rus: Name;
    slk: Name;
    spa: Name;
    srp: Name;
    swe: Name;
    tur: Name;
    urd: Name;
    zho?: Name;
  }

export interface Name {
    common: string;
    official: string;
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}









