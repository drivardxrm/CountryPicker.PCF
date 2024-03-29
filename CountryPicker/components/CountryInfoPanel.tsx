import * as React from "react";
import { mergeStyles } from "@fluentui/react/lib/Styling"; 
import { FontIcon, ImageIcon } from "@fluentui/react/lib/Icon"; 
import { Image } from "@fluentui/react/lib/Image"; 
import { IconButton } from "@fluentui/react/lib/Button"; 
import { Panel } from "@fluentui/react/lib/Panel"; 
import { useBoolean } from "../hooks/useBoolean";
import { useSelectedCountry } from "../hooks/useCountries";
import CountryFlag from "./CountryFlag";


const CountryInfoPanel = (): JSX.Element => {

    const [isOpen, openPanel, dismissPanel] = useBoolean(false);
    const { selectedcountry } = useSelectedCountry();

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
            
            <IconButton iconProps={{ iconName: 'Info' }} title="info" ariaLabel="info" disabled={selectedcountry === undefined} onClick={openPanel} />

            <Panel
                isLightDismiss
                headerText={selectedcountry?.name.common + " (" + selectedcountry?.cca3 + ")"}
                headerClassName={bold}
                isOpen={isOpen}
                onDismiss={dismissPanel}
                // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                closeButtonAriaLabel="Close"                   
            >
                
                <Image
                    src={selectedcountry?.flags?.png}
                    alt="flag"
                    width={150}
                />
                
                <br/>
                <FontIcon iconName="Globe2" className={panelIconClass} /><span className={bold}>Region/Subregion : </span><br/>
                <span>{selectedcountry?.region}/{selectedcountry?.subregion}</span><br/><br/>
    
                <FontIcon iconName="GlobeFavorite" className={panelIconClass} /><span className={bold}>Capital :</span><br/>
                <span>{selectedcountry?.capital?.join()}</span><br/><br/>
    
                <FontIcon iconName="Family" className={panelIconClass} /><span className={bold}>Population : </span><br/>
                <span>{selectedcountry?.population?.toLocaleString("en")}</span><br/><br/>
    
                <FontIcon iconName="AllCurrency" className={panelIconClass} /><span className={bold}>Currencies : </span><br/>
                {selectedcountry && Object.entries(selectedcountry.currencies).map(([k, v]) => {
                    return <div key={'currency-'+k}><span>{v.name} ({v.symbol}) </span><br/></div>
                })}<br/>
                                
                <FontIcon iconName="Clock" className={panelIconClass} /><span className={bold}>Timezones : </span>
                {selectedcountry?.timezones?.map((t:string,i:number) => {return <div key={'tz-'+i}><span>{t}</span><br/></div>})}<br/>
                
                <FontIcon iconName="Feedback" className={panelIconClass} /><span className={bold}>Languages : </span>
                {selectedcountry && Object.entries(selectedcountry.languages).map(([k, v]) => {
                     return <div key={'lang-'+k}><span>{v}</span><br/></div>
                })}<br/>

                
                <FontIcon iconName="Nav2DMapView" className={panelIconClass} /><span className={bold}>Borders : </span>
                {selectedcountry?.borders?.map((b:string,i:number) => {return <CountryFlag code={b} index={i} key={'flag-'+i}/> })}<br/>
            </Panel>

        </>
    );

}

export default CountryInfoPanel;

