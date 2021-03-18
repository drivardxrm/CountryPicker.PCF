import * as React from "react";
import { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useConst } from "@uifabric/react-hooks";
import { initializeIcons,Stack, VirtualizedComboBox, IComboBoxOption,IComboBox } from "@fluentui/react"; 


import { GetCountryName,GetCountry } from "./../utils/CountryUtils"
import CountryPickerComboBoxOption from "./CountryPickerOption"
import CountryInfoPanel from "./CountryInfoPanel"
import MasquedInput from "./MaskedInput"
import FlagIcon from "./FlagIcon"
import { useCountries } from "../hooks/useCountries";

//PROPS for component (received from caller)
export interface ICountryPickerComboBoxProps {
    countrycode: string;
    language: string;
    promoted: string[]|undefined;
    limit: string[]|undefined;
    displayinfo : boolean;
    readonly: boolean;
    masked: boolean;
    onChange: (countrycode:string,countryname:string) => void;
}

const CountryPickerComboBox = (props : ICountryPickerComboBoxProps): JSX.Element => {

    
    
    //STATE HOOKS VARIABLES
    const [selectedOption, setSelectedOption] = useState<IComboBoxOption|undefined>(undefined);

    //Custom Hook based on react-query and axios
    const { isLoading, isError, data } = useCountries(props.limit);

    //EFFECT HOOKS 
    //SET selectedOption 
    useEffect(() => {
        
        if(data && props.countrycode !== selectedOption?.key)
        {
            setSelectedOption(getSelectedOption(props.countrycode))
        }
        
    }, [data, props.countrycode]);

    //-Callback to PCF when 'selectedOption' changes 
    useEffect(() => {

        if(data){ //ensures that countries are loaded
            if(selectedOption && props.countrycode !== selectedOption?.key) {
                
                props.onChange(selectedOption.key.toString(),selectedOption.text); 

            } else if(selectedOption === undefined && props.countrycode.length === 3){ 

                props.onChange("","");
            };
        }
    }, [selectedOption]);

    //MEMO HOOK
    //Get combobox options from countries - Executed only when data is first loaded, value is memoized afterward
    const options = useMemo<IComboBoxOption[]>(()=> {
        let comboboxoptions:IComboBoxOption[] = [];
        if(data){
            comboboxoptions = Array.from(data, i => { return {
                key:i.alpha3Code,
                text:GetCountryName(i,props.language)}
            });
            //filter out some values if 'limit' contains values                                                                     
            if(props.limit){
                comboboxoptions = comboboxoptions.filter(i => props.limit != undefined && props.limit.includes(i.key.toString()))
            }
    
            //sort alphabetically by country name
            comboboxoptions.sort(sortByCountryName)
    
            //sort if 'promoted' (Will bubble up promoted countries)
            if(props.promoted){
                comboboxoptions.sort(sortByPromoted)
            }
        }
        return comboboxoptions;

    },[data]); //dependency 

    

    //Get an option by countrycode (Assumes that country code are unique)
    const getSelectedOption = (countrycode:string) : IComboBoxOption | undefined => {
        
        if(countrycode === ""){
            return undefined;
        };

        let selected = options.filter(o => o.key === countrycode);
        return selected.length === 0 ? undefined : selected[0];
    };

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

    // Rank of a given country compared to the 'promoted' countri list. 
    //Ex. promoted = [USA,CAN,MEX], USA=1, CAN=2, MEX=3, COL=0. If promoted is empty rank = 0 for all countries
    const promotedRank = (countrykey:string | number):Number => {

        var last = props.promoted?.length ?? 0;
        var rank = props.promoted?.indexOf(countrykey.toString()) ?? last;
        return rank < 0 ? last : rank;
    }
            
    //EVENTS
    //- When value of combobox changes, Change selected option and callback to PCF
    const onComboboxChanged = (event: React.FormEvent<IComboBox>,option?:IComboBoxOption|undefined,index? : number | undefined) => {      
        setSelectedOption(option);
    } 

    //MAIN RENDERING
    if(isLoading){
        return <div>Loading...</div>
    }if(isError){
        return <div>Error fetching data...</div>
    }if(props.masked){
        return <MasquedInput/>
    }else 
        return (
            <>
                {data && (
                    <Stack  horizontal>

                        <FlagIcon
                            countrycode={selectedOption?.key.toString()}
                        />
        
                        <VirtualizedComboBox
                            onRenderOption={CountryPickerComboBoxOption}
                            onChange={onComboboxChanged}          
                            selectedKey={selectedOption?.key}
                            text={selectedOption?.text}
                            allowFreeform={true}
                            autoComplete="on"
                            options={options}
                            style={{width:"100%"}}
                            disabled={props.readonly}
                        />
        
                        <CountryInfoPanel 
                            country={GetCountry(data,selectedOption?.key)} 
                            disabled={selectedOption?.key === undefined} 
                            visible={props.displayinfo}
                        />
    
                    </Stack>      
                )}
            </>
        )

}

export default CountryPickerComboBox;