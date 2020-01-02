import * as React from "react";
import { useState} from "react";
import { Image, IconButton, Panel} from "office-ui-fabric-react/lib/index"; 
import { useConstCallback } from '@uifabric/react-hooks';
import { FontIcon, ImageIcon} from "office-ui-fabric-react/lib/Icon";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import {Country,Translations,Currency,Language,RegionalBloc, GetFlagUrl, GetCountryName} from "./Country"

const iconClass = mergeStyles({
    fontSize: 30,
    height: 30,
    width: 55,
    margin: "1px"
});

const smallIconClass = mergeStyles({
    fontSize: 17,
    width: 20,
});

const bold = mergeStyles({
    fontWeight: "bold",
});


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

    if(props.displayicon){
        return(
            <div>                                                               
                <IconButton iconProps={{ iconName: 'Info' }} title="info" ariaLabel="info" disabled={props.disabled} onClick={openPanel} />
                <Panel
                    headerText={props.country?.name}
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
                    <FontIcon iconName="Globe2" className={smallIconClass} /><span className={bold}>Region/Subregion : </span><br/>
                    <span>{props.country?.region}/{props.country?.subregion}</span><br/><br/>
        
                    <FontIcon iconName="GlobeFavorite" className={smallIconClass} /><span className={bold}>Capital :</span><br/>
                    <span>{props.country?.capital}</span><br/><br/>
        
                    <FontIcon iconName="Family" className={smallIconClass} /><span className={bold}>Population : </span><br/>
                    <span>{props.country?.population}</span><br/><br/>
        
                    <FontIcon iconName="AllCurrency" className={smallIconClass} /><span className={bold}>Currencies : </span><br/>
                    {props.country?.currencies.map(c => {return <div><span>{c.name} ({c.symbol}) </span><br/></div>})}<br/>
        
                    <FontIcon iconName="Phone" className={smallIconClass} /><span className={bold}>Calling codes : </span>
                    {props.country?.callingCodes.map(c => {return <div><span>{c}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Clock" className={smallIconClass} /><span className={bold}>Timezones : </span>
                    {props.country?.timezones.map(t => {return <div><span>{t}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Feedback" className={smallIconClass} /><span className={bold}>Languages : </span>
                    {props.country?.languages.map(l => {return <div><span>{l.name}</span><br/></div>})}<br/>
                    
                    <FontIcon iconName="Nav2DMapView" className={smallIconClass} /><span className={bold}>Borders : </span>
                    {props.country?.borders.map(b => {return <div><ImageIcon className={iconClass} imageProps={{src:GetFlagUrl(b),width:46,height:30}}/><span>{b}</span><br/></div>})}<br/>
                </Panel>
            </div>
        );
    }else{
        return <div></div>
    }

  
}

export default CountryInfoPanel;