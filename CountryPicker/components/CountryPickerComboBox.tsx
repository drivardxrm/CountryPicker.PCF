import * as React from "react";
import { Stack } from "@fluentui/react/lib/Stack"; 
import { VirtualizedComboBox, IComboBoxOption,IComboBox } from "@fluentui/react/lib/ComboBox"; 

import CountryPickerComboBoxOption from "./CountryPickerOption"
import MasquedInput from "./MaskedInput"
import FlagIcon from "./FlagIcon"
import { useCountryOptions, useSelectedCountry, useSelectedOption } from "../hooks/useCountries";
import { useViewModel } from "../services/ViewModelProvider";
import { useEffect, useRef } from "react";
import { usePrevious } from "../hooks/usePrevious";




const CountryPickerComboBox = ():JSX.Element => {

    const comboboxRef = useRef<IComboBox>(null);
    
    const vm = useViewModel();
    
    //Custom Hook based on react-query and axios
    const { options, status, error, isFetching } = useCountryOptions();
    //const { data: options, isLoading, isError } = useCountriesAsOptions();
    const { selectedoption } = useSelectedOption();
    const firstUpdate = useRef(true);

    const prevSelectedOption = usePrevious<IComboBoxOption | undefined>(selectedoption); 
    

    //will trigger callback to PCF, if data is changed outside of PCF
    useEffect(
         ()=>{
            if (firstUpdate.current) { // skip on first update 
                firstUpdate.current = false;
                return;
            }
            if(prevSelectedOption !== undefined && selectedoption === undefined){
                vm.onChange("","","");
            }else if(selectedoption !== undefined && selectedoption.key !== prevSelectedOption?.key){
                vm.onChange(selectedoption.key.toString(),selectedoption.text,selectedoption.data?.cca2!);       
            }
         }
     ,[selectedoption])

    //EVENTS
    //- When value of combobox changes, callback to PCF
    const onComboboxChanged = (event: React.FormEvent<IComboBox>,option?:IComboBoxOption|undefined,index? : number | undefined) => {
        vm.onChange(option?.key.toString()!,option?.text!,option?.data?.cca2);       
    } 

    //MAIN RENDERING
    if(status === 'pending' || isFetching){
        return <div>Loading...</div>
    }if(status === 'error'){
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
                    </Stack>      
                )}
            </>
        )

}

export default CountryPickerComboBox;