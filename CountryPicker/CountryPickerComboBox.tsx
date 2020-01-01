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

    const [options, setOptions] = useState(DUMMY_OPTIONS);
    const [countrykey, setCountryKey] = useState(getSelectedKey(props.countryname));

    const { loading, error, data } = useFetch("https://restcountries.eu/rest/v2/all", undefined, []) 
   
    useEffect(() => {
        if(data && !error)
        {
            debugger;
            //var fetchedcountries = data as FetchedCountry[];

            
            let countries = data as Country[];
            let comboboxoptions:IComboBoxOption[] = Array.from(countries, i => { return {key:i.alpha3Code,text:i.name, data: { flag:"https://restcountries.eu/data/" + i.alpha3Code.toString().toLowerCase() + ".svg" }}});
            setOptions(comboboxoptions)
            //var countries =  data.map(item => { key: item.alp, text: "Afghanistan" , data: { flag:"https://restcountries.eu/data/afg.svg" } })
        }
      }, [data]);


    const onComboboxChanged = (event: React.FormEvent<IComboBox>,option?:IComboBoxOption|undefined,index? : number | undefined,value? : string | undefined) => { 
        if(option)
        {
            //var newValue = option.key; 
            //setCountryKey(option.key)
            console.log(index + "-" + option.key + "-" + option.text); 
            setCountryKey(option.key);
            props.onChange(option.text);
            
        }  
    } 
  
    const onRenderOption = (option:IComboBoxOption|undefined): JSX.Element => {
        
        return (
        <div>

            {option && option.data && option.data.flag && (
                <ImageIcon style={{ marginRight: "8px", width:25, height:17 }} imageProps={{src:option.data.flag,width:25,height:17}} aria-hidden="true"/>
            )}

            {option && option.text && (
                <span>{option.text}</span>
            )}
            
        </div>
        );
    
    }

    const getFlagUrl = ():string => 
        "https://restcountries.eu/data/" + countrykey?.toString().toLowerCase() + ".svg"
    

    

    const renderFlagIcon = ():JSX.Element | undefined  => {
        return countrykey != undefined ? 
             <ImageIcon className={iconClass} imageProps={{src:getFlagUrl(),width:46,height:30}}/>
            :
            <FontIcon iconName="GlobeFavorite" className={iconClass} />
    }


    initializeIcons();

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