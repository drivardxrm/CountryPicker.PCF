import * as React from "react";
import { useState} from "react";
import { Image, IconButton, Panel} from "office-ui-fabric-react/lib/index"; 
import { useConstCallback } from '@uifabric/react-hooks';
import { FontIcon, ImageIcon} from "office-ui-fabric-react/lib/Icon";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
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

    const openPanel = useConstCallback(() => setIsOpen(true));
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
                    {props.country?.currencies.map(c => {return <div><span>{c.name} ({c.symbol}) </span><br/></div>})}<br/>
        
                    <FontIcon iconName="Phone" className={panelIconClass} /><span className={bold}>Calling codes : </span>
                    {props.country?.callingCodes.map(c => {return <div><span>{c}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Clock" className={panelIconClass} /><span className={bold}>Timezones : </span>
                    {props.country?.timezones.map(t => {return <div><span>{t}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Feedback" className={panelIconClass} /><span className={bold}>Languages : </span>
                    {props.country?.languages.map(l => {return <div><span>{l.name}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Nav2DMapView" className={panelIconClass} /><span className={bold}>Borders : </span>
                    {props.country?.borders.map(b => {return <div><ImageIcon className={flagIconClass} imageProps={{src:GetFlagUrl(b),width:46,height:30}}/><span>{b}</span><br/></div>})}<br/>
                </Panel>
            </div>
        );
    }else{ //return empty div
        return <div></div>
    }

  
}

export default CountryInfoPanel;