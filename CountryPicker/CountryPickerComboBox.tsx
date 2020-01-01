import * as React from "react";
import  { useState, useEffect } from "react";
import { Stack, Image, IconButton, VirtualizedComboBox, IComboBoxOption,IComboBox} from "office-ui-fabric-react/lib/index"; 
import { FontIcon, ImageIcon, IIconProps } from "office-ui-fabric-react/lib/Icon";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { initializeIcons } from "@uifabric/icons";
import useFetch from "use-http"
import {Country,Translations,Currency,Language,RegionalBloc} from "./Country"

const iconClass = mergeStyles({
    fontSize: 30,
    height: 30,
    width: 50,
    margin: "1px"
});


export interface ICountryPickerComboBoxProps {
    countryname: string;
    language: "en" | "de" | "es" | "fr" | "ja" | "it" | "br" | "pt" | "nl" | "hr" | "fa";
    promoted: string[]|undefined;
    onChange: (countryname:string|undefined) => void;
}

const CountryPickerComboBox = (props : ICountryPickerComboBoxProps): JSX.Element => {
    
    const getSelectedKey = (countryname:string) : string | number | undefined => {
        var selectedOption = options?.filter(o => o.text === countryname);
        return selectedOption.length === 0 ? undefined : selectedOption[0].key;
    }

    const getSelectedCountry = (countrykey:string|number) : Country | undefined => {
        
        var countries = data as Country[];
        
        var selectedCountry = countries.filter(c => c.alpha3Code === countrykey);
        console.log("from method " + selectedCountry[0].capital);
        return selectedCountry.length === 0 ? undefined : selectedCountry[0];
    }

    //STATE HOOKS VARIABLES
    const [options, setOptions] = useState<IComboBoxOption[]>([]);
    const [countrykey, setCountryKey] = useState<string|number|undefined>(getSelectedKey(props.countryname));
    const [selectedCountry, setSelectedCountry] = useState<Country|undefined>(undefined);

    //FETCH HOOK
    const { loading, error, data  } = useFetch("https://restcountries.eu/rest/v2/all", undefined, []) 
   
    //EFFECT HOOKS
    //-Initialization : will happen only once = contructor
    useEffect(() => {
        initializeIcons();
    }, []); 

    //-Set Options when 'data' changes (when retrieved from API call)
    useEffect(() => {
        if(data && !error)
        { 
            let countries = data as Country[];
            let comboboxoptions:IComboBoxOption[] = Array.from(countries, i => { return {
                                                                                            key:i.alpha3Code,
                                                                                            text:getCountryName(i,props.language),
                                                                                        }
                                                                                });
            
            comboboxoptions.sort(sortByPromoted)
            setOptions(comboboxoptions);
            console.log("Options were set!");
        }
      }, [data]);

    //-SET selectedCountry when 'countrykey' changes
    useEffect(() => {
        if(countrykey  && data && !error)
        {
            console.log("Before setSelectedCountry : " + countrykey)
            setSelectedCountry(getSelectedCountry(countrykey));
            
        }else{
            setSelectedCountry(undefined);
        }
    }, [countrykey]);


    
    //UTILS
    const getFlagUrl = (key:string|number|undefined):string => 
        "https://restcountries.eu/data/" + key?.toString().toLowerCase() + ".svg"

    const getCountryName = (country:Country, language:"en" | "de" | "es" | "fr" | "ja" | "it" | "br" | "pt" | "nl" | "hr" | "fa"):string => {
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

    //Checks if a specified country must be promoted in the list
    // const isPromoted = (countrykey:string):boolean 
    //     => props.promoted?.includes(countrykey) ?? false;
    const sortByPromoted = (a:IComboBoxOption,b:IComboBoxOption):number => {
        let ranka = promotedRank(a.key);
        let rankb = promotedRank(b.key);
           
        if (ranka > rankb) return 1;
        if (rankb > ranka) return -1;

        return 0;
    }

    const promotedRank = (countrykey:string | number):Number => {
        //debugger;
        var last = props.promoted?.length ?? 0;
        var rank = props.promoted?.indexOf(countrykey.toString()) ?? last;
        return rank < 0 ? last : rank;
    }
        
    

    const renderFlagIcon = ():JSX.Element | undefined  => {
        return countrykey != undefined ? 
             <ImageIcon className={iconClass} imageProps={{src:getFlagUrl(countrykey),width:46,height:30}}/>
            :
            <FontIcon iconName="GlobeFavorite" className={iconClass} />
    }

    //EVENTS
    const onComboboxChanged = (event: React.FormEvent<IComboBox>,option?:IComboBoxOption|undefined,index? : number | undefined,value? : string | undefined) => { 
        if(option)
        {
            console.log(index + "-" + option.key + "-" + option.text); 
            setCountryKey(option.key);
            props.onChange(option.text); 
            
        }else{
            //clear
            setCountryKey(undefined);
            props.onChange(undefined);
        }  
    } 
  
    const onRenderOption = (option:IComboBoxOption|undefined): JSX.Element => {
        
        return (
        <div>

            {option && option.key && (
                <ImageIcon style={{ marginRight: "8px", width:25, height:17 }} imageProps={{src:getFlagUrl(option.key),width:25,height:17}} aria-hidden="true"/>
            )}

            {option && option.text && (
                <span>{option.text}</span>
            )}
            
        </div>
        );
    
    }

    //RENDERING
    if(loading){
        return <div>Loading...</div>
    }if(error){
        return <div>Error fetching data...</div>
    }else{
        return (
            
            <Stack tokens={{ childrenGap: 2 }} horizontal>
                {renderFlagIcon()}
              
                <VirtualizedComboBox
                    onRenderOption={onRenderOption}
                    onChange={onComboboxChanged}          
                    selectedKey={countrykey}
                    allowFreeform={true}
                    autoComplete="on"
                    options={options}
                />
            </Stack>           
        );
    }
    
  
}

export default CountryPickerComboBox;