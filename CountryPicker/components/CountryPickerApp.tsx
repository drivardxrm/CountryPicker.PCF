
import * as React from "react";
import IViewModel from "../services/ViewModel";
import {ViewModelProvider} from "../services/ViewModelProvider";



import { FluentProvider, IdPrefixProvider, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import CountryPicker from "./CountryPicker";





const CountryPickerApp = (props:IViewModel): React.JSX.Element => 
{

  return (

    <ViewModelProvider viewmodel={props}>
      <IdPrefixProvider value={`countrypicker-${props.instanceid}`}>
        <FluentProvider theme={props.isDarkMode ? webDarkTheme : webLightTheme}>
          <CountryPicker/>
        </FluentProvider>
      </IdPrefixProvider>
      
    </ViewModelProvider>    
  );

} 

export default CountryPickerApp;
