import * as React from "react";
import { FontIcon,ImageIcon,mergeStyles } from "@fluentui/react"; 
import { GetFlagUrl} from "./../utils/CountryUtils"

export interface IFlagIconProps {
    countrycode: string|undefined;
}

//If country is defined display flag, otherwise display Globe icon
const FlagIcon = (props:IFlagIconProps):JSX.Element => {

    const flagiconclass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 50,
        margin: "1px",      
    });


    return props.countrycode  ?
        <ImageIcon className={flagiconclass} imageProps={{src:GetFlagUrl(props.countrycode), height:"100%", width:"100%"}}/> :
        <FontIcon iconName="Globe" className={flagiconclass} />
}
export default FlagIcon;