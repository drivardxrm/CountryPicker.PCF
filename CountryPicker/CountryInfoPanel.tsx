import * as React from "react";
import { useState } from "react";
import { mergeStyles, FontIcon, ImageIcon,Image, IconButton, Panel} from "@fluentui/react"; 
import { useConstCallback } from "@uifabric/react-hooks";
import { Country,GetFlagUrl } from "./CountryUtils"

//PROPS for component (received from caller)
export interface ICountryInfoPanelProps {
    country: Country | undefined;
    
    disabled: boolean;
    displayicon: boolean;
}

const CountryInfoPanel = (props : ICountryInfoPanelProps): JSX.Element => {

    //STATE HOOKS VARIABLES   
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openPanel =  useConstCallback(() => setIsOpen(true));
    const dismissPanel = useConstCallback(() => setIsOpen(false));

    //STYLES
    const flagIconClass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 55,
        margin: "1px"
    });
    
    const panelIconClass = mergeStyles({
        fontSize: 17,
        width: 20,
    });
    
    const bold = mergeStyles({
        fontWeight: "bold",
    });


    if(props.displayicon){
        return(
            <div>                                                               
                <IconButton iconProps={{ iconName: 'Info' }} title="info" ariaLabel="info" disabled={props.disabled} onClick={openPanel} />
                <Panel
                    isLightDismiss
                    headerText={props.country?.name + " (" + props.country?.alpha3Code + ")"}
                    headerClassName={bold}
                    isOpen={isOpen}
                    onDismiss={dismissPanel}
                    // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                    closeButtonAriaLabel="Close"                   
                >
                    
                    <Image
                        src={GetFlagUrl(props.country?.alpha3Code)}
                        alt="flag"
                        width={150}
                    />
                    
                    <br/>
                    <FontIcon iconName="Globe2" className={panelIconClass} /><span className={bold}>Region/Subregion : </span><br/>
                    <span>{props.country?.region}/{props.country?.subregion}</span><br/><br/>
        
                    <FontIcon iconName="GlobeFavorite" className={panelIconClass} /><span className={bold}>Capital :</span><br/>
                    <span>{props.country?.capital}</span><br/><br/>
        
                    <FontIcon iconName="Family" className={panelIconClass} /><span className={bold}>Population : </span><br/>
                    <span>{props.country?.population?.toLocaleString("en")}</span><br/><br/>
        
                    <FontIcon iconName="AllCurrency" className={panelIconClass} /><span className={bold}>Currencies : </span><br/>
                    {props.country?.currencies.map((c,i) => {return <div key={'currency-'+i}><span>{c.name} ({c.symbol}) </span><br/></div>})}<br/>
        
                    <FontIcon iconName="Phone" className={panelIconClass} /><span className={bold}>Calling codes : </span>
                    {props.country?.callingCodes.map((c,i) => {return <div key={'code-'+i}><span>{c}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Clock" className={panelIconClass} /><span className={bold}>Timezones : </span>
                    {props.country?.timezones.map((t,i) => {return <div key={'tz-'+i}><span>{t}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Feedback" className={panelIconClass} /><span className={bold}>Languages : </span>
                    {props.country?.languages.map((l,i) => {return <div key={'lang-'+i}><span>{l.name}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Nav2DMapView" className={panelIconClass} /><span className={bold}>Borders : </span>
                    {props.country?.borders.map((b,i) => {return <div key={'border-'+i}><ImageIcon className={flagIconClass} imageProps={{src:GetFlagUrl(b),width:46,height:30}}/><span>{b}</span><br/></div>})}<br/>
                </Panel>
            </div>
        );
    }else{ //return empty div
        return <div></div>
    }

  
}

export default CountryInfoPanel;