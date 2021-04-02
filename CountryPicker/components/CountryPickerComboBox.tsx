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
    const { isLoading, isError, data } = useCountries(props.limit,props.promoted,props.language);

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
    // const options = useMemo<IComboBoxOption[]>(()=> {
    //     let comboboxoptions:IComboBoxOption[] = [];
    //     if(data){
    //         comboboxoptions = Array.from(data, i => { return {
    //             key:i.alpha3Code,
    //             text:GetCountryName(i,props.language)}
    //         });
    //         //filter out some values if 'limit' contains values                                                                     
    //         if(props.limit){
    //             comboboxoptions = comboboxoptions.filter(i => props.limit != undefined && props.limit.includes(i.key.toString()))
    //         }
    
    //         //sort alphabetically by country name
    //         comboboxoptions.sort(sortByCountryName)
    
    //         //sort if 'promoted' (Will bubble up promoted countries)
    //         if(props.promoted){
    //             comboboxoptions.sort(sortByPromoted)
    //         }
    //     }
    //     return comboboxoptions;

    // },[data]); //dependency 

    

    //Get an option by countrycode (Assumes that country code are unique)
    const getSelectedOption = (countrycode:string) : IComboBoxOption | undefined => {
        
         if(countrycode === ""){
             return undefined;
         };

         return  data?.filter(o => o.key === countrycode)[0];
     };


            
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
                            options={data}
                            style={{width:"100%"}}
                            disabled={props.readonly}
                            
                        />
                        {props.displayinfo &&(
                            <CountryInfoPanel 
                                countrycode={selectedOption?.key?.toString() || ""} 
                                disabled={selectedOption?.key === undefined} 
                            />
                        )}
                        
    
                    </Stack>      
                )}
            </>
        )

}

export default CountryPickerComboBox;