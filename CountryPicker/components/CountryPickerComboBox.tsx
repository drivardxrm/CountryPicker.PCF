import * as React from "react";
import { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useConst } from "@uifabric/react-hooks";
import { initializeIcons,Stack, VirtualizedComboBox, IComboBoxOption,IComboBox } from "@fluentui/react"; 


import { GetCountryName,GetCountry } from "./../utils/CountryUtils"
import CountryPickerComboBoxOption from "./CountryPickerOption"
import CountryInfoPanel from "./CountryInfoPanel"
import MasquedInput from "./MaskedInput"
import FlagIcon from "./FlagIcon"
import { useCountriesAsOptions } from "../hooks/useCountries";
import { useViewModel } from "../services/ViewModelProvider";

//PROPS for component (received from caller)
export interface ICountryPickerComboBoxProps {
    //countrycode: string;
    // language: string;
    // promoted: string[]|undefined;
    // limit: string[]|undefined;
    //displayinfo : boolean;
    //readonly: boolean;
    //masked: boolean;
    //onChange: (countrycode:string,countryname:string) => void;
}

const CountryPickerComboBox = ():JSX.Element => {

    const vm = useViewModel();
    
    //STATE HOOKS VARIABLES
    const [selectedOption, setSelectedOption] = useState<IComboBoxOption|undefined>(undefined);

    //Custom Hook based on react-query and axios
    const { data: options, isLoading, isError } = useCountriesAsOptions();

    //EFFECT HOOKS 
    //SET selectedOption 
    useEffect(() => {
        
        if(options && vm.countrycode !== selectedOption?.key)
        {
            setSelectedOption(getSelectedOption(vm.countrycode))
        }
        
    }, [options, vm.countrycode]);

    //-Callback to PCF when 'selectedOption' changes 
    useEffect(() => {

        if(options){ //ensures that countries are loaded
            if(selectedOption && vm.countrycode !== selectedOption?.key) {
                
                vm.onChange(selectedOption.key.toString(),selectedOption.text); 

            } else if(selectedOption === undefined && vm.countrycode.length === 3){ 

                vm.onChange("","");
            };
        }
    }, [selectedOption]);

    
    //Get an option by countrycode (Assumes that country code are unique)
    const getSelectedOption = (countrycode:string) : IComboBoxOption | undefined => {
        
         if(countrycode === ""){
             return undefined;
         };

         return  options?.filter(o => o.key === countrycode)[0];
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
    }if(vm.masked){ 
        return <MasquedInput/>
    }else 
        return (
            <>
                {options && (
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
                            disabled={vm.readonly}
                            
                        />
                        {vm.displayinfo &&(
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