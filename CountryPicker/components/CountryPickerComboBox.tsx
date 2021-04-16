import * as React from "react";
import { Stack } from "@fluentui/react/lib/Stack"; 
import { VirtualizedComboBox, IComboBoxOption,IComboBox } from "@fluentui/react/lib/ComboBox"; 

import CountryPickerComboBoxOption from "./CountryPickerOption"
import CountryInfoPanel from "./CountryInfoPanel"
import MasquedInput from "./MaskedInput"
import FlagIcon from "./FlagIcon"
import { useCountriesAsOptions, useSelectedCountryAsOption } from "../hooks/useCountries";
import { useViewModel } from "../services/ViewModelProvider";



const CountryPickerComboBox = ():JSX.Element => {

    const vm = useViewModel();
    
    //Custom Hook based on react-query and axios
    const { data: options, isLoading, isError } = useCountriesAsOptions();
    const { data: selectedOption } = useSelectedCountryAsOption();

            
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
                            onRenderOption={CountryPickerComboBoxOption}
                            onChange={onComboboxChanged}          
                            selectedKey={selectedOption?.key}
                            text={selectedOption?.text ?? " "}
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