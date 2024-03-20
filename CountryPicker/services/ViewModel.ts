interface IViewModel{ 
  
  //view props
  countrycode: string;
  language: "en" | "de" | "es" | "fr" | "ja" | "it" | "pt" | "nl" | "fa";
  promoted: string[]|undefined;
  limit: string[]|undefined;
  displayinfo : boolean;
  readonly: boolean;
  masked: boolean;

  //callback function to PCF
  onChange: (countrycode:string,countryname:string,countrycodeiso2:string) => void;

}

export default IViewModel