import * as React from "react";
import { useState, useEffect } from "react";
import { Stack, Image, IconButton, Panel, VirtualizedComboBox, IComboBoxOption,IComboBox} from "office-ui-fabric-react/lib/index"; 
import { useConstCallback } from '@uifabric/react-hooks';
import { FontIcon, ImageIcon} from "office-ui-fabric-react/lib/Icon";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { initializeIcons } from "@uifabric/icons";
import useFetch from "use-http"
import {Country,Translations,Currency,Language,RegionalBloc, GetFlagUrl, GetCountryName} from "./Country"

const iconClass = mergeStyles({
    fontSize: 30,
    height: 30,
    width: 50,
    margin: "1px"
});

const smallIconClass = mergeStyles({
    fontSize: 17,
 
    width: 20,

});

const bold = mergeStyles({
    fontWeight: "bold",
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
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openPanel = useConstCallback(() => setIsOpen(true));
    const dismissPanel = useConstCallback(() => setIsOpen(false));

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
            console.log("Before setSelectedCountry : " + countrykey)
            setSelectedCountry(getSelectedCountry(countrykey));
            
        }else{
            setSelectedCountry(undefined);
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
             <ImageIcon className={iconClass} imageProps={{src:GetFlagUrl(countrykey),width:46,height:30}}/>
            :
            <FontIcon iconName="Globe" className={iconClass} />
    }

    const renderInfoIcon = ():JSX.Element => {
        if(props.displayinfo){
            return <IconButton iconProps={{ iconName: 'Info' }} title="info" ariaLabel="info" disabled={countrykey == undefined} onClick={openPanel} />
        }else{
            return <div/>
        }
        
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

                    {renderInfoIcon()}
                </Stack>
                <Panel
                        headerText={selectedCountry?.name}
                        isOpen={isOpen}
                        onDismiss={dismissPanel}
                        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                        closeButtonAriaLabel="Close"
                    >
                    <Image
                        src={GetFlagUrl(selectedCountry?.alpha3Code)}
                        alt="flag"
                        width={150}
                    />
                    <br/>
                    <FontIcon iconName="Globe2" className={smallIconClass} /><span className={bold}>Region/Subregion : </span><br/>
                    <span>{selectedCountry?.region}/{selectedCountry?.subregion}</span><br/><br/>

                    <FontIcon iconName="GlobeFavorite" className={smallIconClass} /><span className={bold}>Capital :</span><br/>
                    <span>{selectedCountry?.capital}</span><br/><br/>

                    <FontIcon iconName="Family" className={smallIconClass} /><span className={bold}>Population : </span><br/>
                    <span>{selectedCountry?.population}</span><br/><br/>

                    <FontIcon iconName="AllCurrency" className={smallIconClass} /><span className={bold}>Currencies : </span><br/>
                    {selectedCountry?.currencies.map(c => {return <div><span>{c.name} ({c.symbol}) </span><br/></div>})}<br/>

                    <FontIcon iconName="Phone" className={smallIconClass} /><span className={bold}>Calling codes : </span>
                    {selectedCountry?.callingCodes.map(c => {return <div><span>{c}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Clock" className={smallIconClass} /><span className={bold}>Timezones : </span>
                    {selectedCountry?.timezones.map(t => {return <div><span>{t}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Feedback" className={smallIconClass} /><span className={bold}>Languages : </span>
                    {selectedCountry?.languages.map(l => {return <div><span>{l.name}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Nav2DMapView" className={smallIconClass} /><span className={bold}>Borders : </span>
                    {selectedCountry?.borders.map(b => {return <div><ImageIcon className={iconClass} imageProps={{src:GetFlagUrl(b),width:46,height:30}}/><span>{b}</span><br/></div>})}<br/>
                </Panel>
            </div>
                       
        );
    }
    
  
}

export default CountryPickerComboBox;