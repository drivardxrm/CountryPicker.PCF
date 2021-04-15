import * as React from "react";
import { mergeStyles, FontIcon, ImageIcon,Image, IconButton, Panel} from "@fluentui/react"; 

import { GetFlagUrl } from "../utils/CountryUtils";
import { useBoolean } from "../hooks/useBoolean";
import { useSelectedCountry } from "../hooks/useCountries";


const CountryInfoPanel = (): JSX.Element => {

    const [isOpen, openPanel, dismissPanel] = useBoolean(false);
    const { data } = useSelectedCountry();

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


    return(
        <>                                                               
            
            <IconButton iconProps={{ iconName: 'Info' }} title="info" ariaLabel="info" disabled={data === undefined} onClick={openPanel} />

            <Panel
                isLightDismiss
                headerText={data?.name + " (" + data?.alpha3Code + ")"}
                headerClassName={bold}
                isOpen={isOpen}
                onDismiss={dismissPanel}
                // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                closeButtonAriaLabel="Close"                   
            >
                
                <Image
                    src={GetFlagUrl(data?.alpha3Code)}
                    alt="flag"
                    width={150}
                />
                
                <br/>
                <FontIcon iconName="Globe2" className={panelIconClass} /><span className={bold}>Region/Subregion : </span><br/>
                <span>{data?.region}/{data?.subregion}</span><br/><br/>
    
                <FontIcon iconName="GlobeFavorite" className={panelIconClass} /><span className={bold}>Capital :</span><br/>
                <span>{data?.capital}</span><br/><br/>
    
                <FontIcon iconName="Family" className={panelIconClass} /><span className={bold}>Population : </span><br/>
                <span>{data?.population?.toLocaleString("en")}</span><br/><br/>
    
                <FontIcon iconName="AllCurrency" className={panelIconClass} /><span className={bold}>Currencies : </span><br/>
                {data?.currencies?.map((c,i) => {return <div key={'currency-'+i}><span>{c.name} ({c.symbol}) </span><br/></div>})}<br/>
    
                <FontIcon iconName="Phone" className={panelIconClass} /><span className={bold}>Calling codes : </span>
                {data?.callingCodes?.map((c,i) => {return <div key={'code-'+i}><span>{c}</span><br/></div>})}<br/>
                
                <FontIcon iconName="Clock" className={panelIconClass} /><span className={bold}>Timezones : </span>
                {data?.timezones?.map((t,i) => {return <div key={'tz-'+i}><span>{t}</span><br/></div>})}<br/>
                
                <FontIcon iconName="Feedback" className={panelIconClass} /><span className={bold}>Languages : </span>
                {data?.languages?.map((l,i) => {return <div key={'lang-'+i}><span>{l.name}</span><br/></div>})}<br/>
                
                <FontIcon iconName="Nav2DMapView" className={panelIconClass} /><span className={bold}>Borders : </span>
                {data?.borders?.map((b,i) => {return <div key={'border-'+i}><ImageIcon className={flagIconClass} imageProps={{src:GetFlagUrl(b),width:46,height:30}}/><span>{b}</span><br/></div>})}<br/>
            </Panel>

        </>
    );

}

export default CountryInfoPanel;

