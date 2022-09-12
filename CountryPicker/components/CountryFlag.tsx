import * as React from "react";
import { mergeStyles } from "@fluentui/react/lib/Styling"; 
import { ImageIcon } from "@fluentui/react/lib/Icon"; 
import { useCountry } from "../hooks/useCountries";
import { Stack } from "@fluentui/react/lib/Stack";

interface CountryFlagProps{
    code:string,
    index:number
}


const CountryFlag = ({code,index}:CountryFlagProps): JSX.Element => {

    
    const { country } = useCountry(code);
    
    //STYLES
    const flagIconClass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 55,
        margin: "1px"
    });
    

    return(
        <Stack>
            <ImageIcon className={flagIconClass} imageProps={{src:country?.flag ?? '',width:46,height:30}}/>
            <span >{code}</span>
            <br/>
        </Stack>
    );

}

export default CountryFlag;