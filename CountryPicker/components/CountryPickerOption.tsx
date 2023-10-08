import * as React from "react";
import {  ImageIcon } from "@fluentui/react/lib/Icon"; 
import {  IComboBoxOption } from "@fluentui/react/lib/ComboBox"; 
import { useCountry } from "../hooks/useCountries";



const CountryPickerOption = (option:IComboBoxOption|undefined): JSX.Element => {
 
    const {country} = useCountry(option?.key.toString() ?? '');

    return (
        <div>
            {option && option.key && (
                <ImageIcon 
                    style={{ marginRight: "8px", width:25, height:17 }} 
                    imageProps={{src:country?.flags.png,width:25,height:17}}
                />
            )}

            {option && option.text && (
                <span>{option.text}</span>
            )}            
        </div>
    );
    
    
}

export default CountryPickerOption;