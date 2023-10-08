//Extracted interface from this API : https://restcountries.com/v3.1/all?fields=name,flags,cca3,capital,region,subregion,translations,population,timezones,currencies,borders,idd,languages

export interface Country {
    flags: Flags;
    name: Name;
    cca3: string;
    currencies: Record<string, Currency>;
    idd: Idd;
    region: string;
    capital: string[];
    subregion: string;
    translations: Translations;
    borders: string[];
    population: number;
    timezones: string[];
    languages: Record<string, string>;
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

export interface Idd {
    root: string;
    suffixes: string[];
}

export interface Currency {
    name: string;
    symbol: string;
}

//   export interface Currencies {
//     XPF?: Currency;
//     EUR?: Currency;
//     VES?: Currency;
//     USD?: Currency;
//     XCD?: Currency;
//     GIP?: Currency;
//     KES?: Currency;
//     BRL?: Currency;
//     MVR?: Currency;
//     CKD?: Currency;
//     NZD?: Currency;
//     SCR?: Currency;
//     XAF?: Currency;
//     VUV?: Currency;
//     GMD?: Currency;
//     GYD?: Currency;
//     FKP?: Currency;
//     DZD?: Currency;
//     MAD?: Currency;
//     MRU?: Currency;
//     TRY?: Currency;
//     PKR?: Currency;
//     IRR?: Currency;
//     IDR?: Currency;
//     AFN?: Currency;
//     ALL?: Currency;
//     CDF?: Currency;
//     XOF?: Currency;
//     SDG?: Currency;
//     SAR?: Currency;
//     KHR?: Currency;
//     NPR?: Currency;
//     MYR?: Currency;
//     RWF?: Currency;
//     THB?: Currency;
//     JOD?: Currency;
//     CHF?: Currency;
//     KMF?: Currency;
//     GBP?: Currency;
//     IMP?: Currency;
//     HKD?: Currency;
//     JEP?: Currency;
//     TJS?: Currency;
//     BGN?: Currency;
//     EGP?: Currency;
//     MWK?: Currency;
//     CVE?: Currency;
//     MDL?: Currency;
//     DKK?: Currency;
//     TMT?: Currency;
//     BBD?: Currency;
//     ERN?: Currency;
//     LSL?: Currency;
//     ZAR?: Currency;
//     TZS?: Currency;
//     SOS?: Currency;
//     ANG?: Currency;
//     DOP?: Currency;
//     GNF?: Currency;
//     NAD?: Currency;
//     SHP?: Currency;
//     SBD?: Currency;
//     MOP?: Currency;
//     ARS?: Currency;
//     BAM?: Currency;
//     GGP?: Currency;
//     DJF?: Currency;
//     SYP?: Currency;
//     PEN?: Currency;
//     AUD?: Currency;
//     JMD?: Currency;
//     KZT?: Currency;
//     SLL?: Currency;
//     KRW?: Currency;
//     BZD?: Currency;
//     PGK?: Currency;
//     ISK?: Currency;
//     TWD?: Currency;
//     JPY?: Currency;
//     CNY?: Currency;
//     LBP?: Currency;
//     LKR?: Currency;
//     GTQ?: Currency;
//     RSD?: Currency;
//     MGA?: Currency;
//     SZL?: Currency;
//     RON?: Currency;
//     ZMW?: Currency;
//     ZWL?: Currency;
//     TND?: Currency;
//     AED?: Currency;
//     MNT?: Currency;
//     NOK?: Currency;
//     UYU?: Currency;
//     BSD?: Currency;
//     RUB?: Currency;
//     YER?: Currency;
//     SEK?: Currency;
//     LAK?: Currency;
//     COP?: Currency;
//     CAD?: Currency;
//     INR?: Currency;
//     MKD?: Currency;
//     PYG?: Currency;
//     CRC?: Currency;
//     UGX?: Currency;
//     BOB?: Currency;
//     KPW?: Currency;
//     MUR?: Currency;
//     HNL?: Currency;
//     KGS?: Currency;
//     CLP?: Currency;
//     BMD?: Currency;
//     LRD?: Currency;
//     LYD?: Currency;
//     OMR?: Currency;
//     PHP?: Currency;
//     PLN?: Currency;
//     FOK?: Currency;
//     BHD?: Currency;
//     BYN?: Currency;
//     QAR?: Currency;
//     VND?: Currency;
//     SGD?: Currency;
//     GEL?: Currency;
//     BIF?: Currency;
//     SSP?: Currency;
//     WST?: Currency;
//     KWD?: Currency;
//     TTD?: Currency;
//     TVD?: Currency;
//     AOA?: Currency;
//     TOP?: Currency;
//     MZN?: Currency;
//     MMK?: Currency;
//     ETB?: Currency;
//     AZN?: Currency;
//     UZS?: Currency;
//     BDT?: Currency;
//     AMD?: Currency;
//     NGN?: Currency;
//     BND?: Currency;
//     ILS?: Currency;
//     AWG?: Currency;
//     NIO?: Currency;
//     HTG?: Currency;
//     KID?: Currency;
//     KYD?: Currency;
//     UAH?: Currency;
//     MXN?: Currency;
//     FJD?: Currency;
//     GHS?: Currency;
//     SRD?: Currency;
//     CUC?: Currency;
//     CUP?: Currency;
//     BTN?: Currency;
//     HUF?: Currency;
//     STN?: Currency;
//     IQD?: Currency;
//     CZK?: Currency;
//     BWP?: Currency;
//     PAB?: Currency;
//   }







