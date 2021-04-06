
interface IViewModel{ 
  
  countrycode: string;
  language: "en" | "de" | "es" | "fr" | "ja" | "it" | "pt" | "nl" | "fa";
  promoted: string[]|undefined;
  limit: string[]|undefined;
  displayinfo : boolean;
  readonly: boolean;
  masked: boolean;
  onChange: (countrycode:string,countryname:string) => void;

}

export default IViewModel