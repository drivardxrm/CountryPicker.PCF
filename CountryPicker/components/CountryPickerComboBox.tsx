import * as React from "react";
import { Stack } from "@fluentui/react/lib/Stack"; 
import { VirtualizedComboBox, IComboBoxOption,IComboBox } from "@fluentui/react/lib/ComboBox"; 

import CountryPickerComboBoxOption from "./CountryPickerOption"
import CountryInfoPanel from "./CountryInfoPanel"
import MasquedInput from "./MaskedInput"
import FlagIcon from "./FlagIcon"
import { useCountryOptions, useSelectedOption } from "../hooks/useCountries";
import { useViewModel } from "../services/ViewModelProvider";
import { useEffect, useRef } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { asComboboxOptions } from "../utils/ComboBoxUtils";



const CountryPickerComboBox = ():JSX.Element => {

    const comboboxRef = useRef<IComboBox>(null);
    
    const vm = useViewModel();
    
    //Custom Hook based on react-query and axios
    const { options, isLoading, isError } = useCountryOptions();
    //const { data: options, isLoading, isError } = useCountriesAsOptions();
    const { selectedoption } = useSelectedOption();

    const prevSelectedOption = usePrevious<IComboBoxOption | undefined>(selectedoption); 
    

    //will trigger callback to PCF, if data is changed outside of PCF
    useEffect(
         ()=>{
             if(prevSelectedOption !== undefined && selectedoption === undefined){
                vm.onChange("","");
             }else if(selectedoption !== undefined && selectedoption !== prevSelectedOption){
                vm.onChange(selectedoption.key.toString(),selectedoption.text);       
             }
         }
     ,[selectedoption])

    //EVENTS
    //- When value of combobox changes, callback to PCF
    const onComboboxChanged = (event: React.FormEvent<IComboBox>,option?:IComboBoxOption|undefined,index? : number | undefined) => {
        vm.onChange(option?.key.toString()!,option?.text!);       
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

                        <FlagIcon/>
        
                        <VirtualizedComboBox
                            componentRef={comboboxRef}
                            onRenderOption={CountryPickerComboBoxOption}
                            onChange={onComboboxChanged}          
                            selectedKey={selectedoption?.key}
                            text={selectedoption?.text ?? " "}
                            allowFreeform={true}
                            autoComplete="on"
                            options={options}
                            style={{width:"100%"}}
                            disabled={vm.readonly}
                            
                        />
                        {vm.displayinfo &&(
                            <CountryInfoPanel />
                        )}
                        
    
                    </Stack>      
                )}
            </>
        )

}

export default CountryPickerComboBox;