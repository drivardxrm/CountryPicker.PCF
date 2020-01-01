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

//DUMMY
const DUMMY_OPTIONS: IComboBoxOption[] = [
  { key: "AFG", text: "Afghanistan" },  
  { key: "ALA", text: "Åland Islands" },  
  { key: "ALB", text: "Albania"  },
  { key: "CAN", text: "Canada" }
];

export interface ICountryPickerComboBoxProps {
    countryname: string;
    onChange: (countryname:string) => void;
}




export interface FetchedCountry {
    alpha3Code : string,
    name: string
}

const CountryPickerComboBox = (props : ICountryPickerComboBoxProps): JSX.Element => {
    
    const getSelectedKey = (countryname:string) : string | number | undefined => {
        var selectedOption = options.filter(o => o.text === countryname);
        return selectedOption.length === 0 ? undefined : selectedOption[0].key;
    }

    const getSelectedCountry = (countrykey:string|number) : Country | {} => {
        var countries = data as Country[];
        
        var selectedCountry = countries.filter(c => c.alpha3Code === countrykey);
        console.log("from method " + selectedCountry[0].capital);
        return selectedCountry.length === 0 ? {} : selectedCountry[0];
    }

    const [options, setOptions] = useState(DUMMY_OPTIONS);
    const [countrykey, setCountryKey] = useState(getSelectedKey(props.countryname));
    const [selectedCountry, setSelectedCountry] = useState<Country|{}>({});

    const { loading, error, data  } = useFetch("https://restcountries.eu/rest/v2/all", undefined, []) 
   
    useEffect(() => {
        console.log("initialize");
        initializeIcons();
    }, []); //will happen only once = contructor

    useEffect(() => {
        if(data && !error)
        {
           
            let countries = data as Country[];
            let comboboxoptions:IComboBoxOption[] = Array.from(countries, i => { return {key:i.alpha3Code,text:i.name}});
            setOptions(comboboxoptions);
            console.log("Options were set!");
        }
      }, [data]);

    useEffect(() => {
        if(countrykey && data && !error)
        {
            console.log("Before setSelectedCountry : " + countrykey)
            setSelectedCountry(getSelectedCountry(countrykey));
            console.log("Capital : " + (selectedCountry as Country).capital)
            
        }else{
            setSelectedCountry({});
        }
    }, [countrykey]);




    const onComboboxChanged = (event: React.FormEvent<IComboBox>,option?:IComboBoxOption|undefined,index? : number | undefined,value? : string | undefined) => { 
        if(option)
        {
            console.log(index + "-" + option.key + "-" + option.text); 
            setCountryKey(option.key);
            props.onChange(option.text);
            
        }else{
            //clear
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

    const getFlagUrl = (key:string|number|undefined):string => 
        "https://restcountries.eu/data/" + key?.toString().toLowerCase() + ".svg"
    

    const renderFlagIcon = ():JSX.Element | undefined  => {
        return countrykey != undefined ? 
             <ImageIcon className={iconClass} imageProps={{src:getFlagUrl(countrykey),width:46,height:30}}/>
            :
            <FontIcon iconName="GlobeFavorite" className={iconClass} />
    }




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