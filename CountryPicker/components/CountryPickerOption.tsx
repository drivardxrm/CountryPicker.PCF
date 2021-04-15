import * as React from "react";
import {  ImageIcon, IComboBoxOption } from "@fluentui/react"; 
import {GetFlagUrl} from "./../utils/CountryUtils"


const CountryPickerOption = (option:IComboBoxOption|undefined): JSX.Element => {
 
    
    return (
        <div>
            {option && option.key && (
                <ImageIcon 
                    style={{ marginRight: "8px", width:25, height:17 }} 
                    imageProps={{src:GetFlagUrl(option.key),width:25,height:17}}
                />
            )}

            {option && option.text && (
                <span>{option.text}</span>
            )}            
        </div>
    );
    
    
}

export default CountryPickerOption;