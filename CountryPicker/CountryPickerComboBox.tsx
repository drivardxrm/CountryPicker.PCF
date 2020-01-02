import * as React from "react";
import { useState, useEffect } from "react";
import { Stack, VirtualizedComboBox, IComboBoxOption,IComboBox} from "office-ui-fabric-react/lib/index"; 
import { FontIcon, ImageIcon} from "office-ui-fabric-react/lib/Icon";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { initializeIcons } from "@uifabric/icons";
import useFetch from "use-http"
import {Country, GetFlagUrl, GetCountryName, GetCountry} from "./Country"
import CountryInfoPanel, {ICountryInfoPanelProps} from "./CountryInfoPanel"

const iconClass = mergeStyles({
    fontSize: 30,
    height: 30,
    width: 70,
    margin: "1px"
});


export interface ICountryPickerComboBoxProps {
    countryname: string;
    language: "en" | "de" | "es" | "fr" | "ja" | "it" | "br" | "pt" | "nl" | "hr" | "fa";
    promoted: string[]|undefined;
    limit: string[]|undefined;
    displayinfo : boolean;
    onChange: (countryname:string|undefined) => void;
}

const CountryPickerComboBox = (props : ICountryPickerComboBoxProps): JSX.Element => {
    
    const getSelectedKey = (countryname:string) : string | number | undefined => {
        var selectedOption = options?.filter(o => o.text === countryname);
        return selectedOption.length === 0 ? undefined : selectedOption[0].key;
    }


    //STATE HOOKS VARIABLES
    const [options, setOptions] = useState<IComboBoxOption[]>([]);
    const [countrykey, setCountryKey] = useState<string|number|undefined>(getSelectedKey(props.countryname));
    const [countryInfoPanelProps, setCountryInfoPanelProps] = useState<ICountryInfoPanelProps>({country:undefined,disabled:true,displayicon:props.displayinfo});


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
            let comboboxoptions:IComboBoxOption[] = Array.from(countries, i => { 
                                                                                        return {
                                                                                            key:i.alpha3Code,
                                                                                            text:GetCountryName(i,props.language),
                                                                                        }
                                                                                });
            //filter if limit                                                                     
            if(props.limit){
                comboboxoptions = comboboxoptions.filter(i => props.limit != undefined && props.limit.includes(i.key.toString()))
            }


            //sort by country name
            comboboxoptions.sort(sortByCountryName)
            //sort if promoted (Will bubble up promoted countries)
            if(props.promoted){
                comboboxoptions.sort(sortByPromoted)
            }
            
            setOptions(comboboxoptions);
            console.log("Options were set!");
        }
      }, [data]);

    //-SET selectedCountry when 'countrykey' changes
    useEffect(() => {
        if(countrykey  && data && !error)
        {
            setCountryInfoPanelProps({country:GetCountry(data as Country[],countrykey),disabled:false,displayicon:props.displayinfo})        
        }else{
            setCountryInfoPanelProps({country:undefined,disabled:true,displayicon:props.displayinfo})
        }
    }, [countrykey]);

    //Sort functions for combobox options
    const sortByCountryName = (a:IComboBoxOption,b:IComboBoxOption):number => {

        if (a.text > b.text) return 1;
        if (b.text > a.text) return -1;

        return 0;
    }

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
        
    

    const renderFlagIcon = ():JSX.Element => {
        return countrykey != undefined ? 
             <ImageIcon className={iconClass} imageProps={{src:GetFlagUrl(countrykey), height:30, width:60}}/>
            :
            <FontIcon iconName="Globe" className={iconClass} />
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
                <ImageIcon style={{ marginRight: "8px", width:25, height:17 }} imageProps={{src:GetFlagUrl(option.key),width:25,height:17}} aria-hidden="true"/>
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
            <div>
                <Stack tokens={{ childrenGap: 2 }} horizontal>
                    {renderFlagIcon()}
                    
                    <VirtualizedComboBox
                        onRenderOption={onRenderOption}
                        onChange={onComboboxChanged}          
                        selectedKey={countrykey}
                        allowFreeform={true}
                        autoComplete="on"
                        options={options}
                        style={{width:"100%"}}
                    />
                    
                    {React.createElement(CountryInfoPanel,countryInfoPanelProps)}

                </Stack>
                
            </div>
                       
        );
    }
    
  
}

export default CountryPickerComboBox;