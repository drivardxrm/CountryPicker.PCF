import { initializeIcons } from "@fluentui/react/lib/Icons";
import * as React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IViewModel from "../services/ViewModel";
import {ViewModelProvider} from "../services/ViewModelProvider";


import CountryPickerComboBox from "./CountryPickerComboBox";
import { FluentProvider, IdPrefixProvider, webDarkTheme, webLightTheme } from "@fluentui/react-components";
//initilize icons
initializeIcons();

//declare outside of FC element so it doesnt gets evaluated at each rerenders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false
      //IMPORTANT otherwise data will be refreshed everytime the focus on the PCF is lost and regained 
      //https://react-query.tanstack.com/guides/window-focus-refetching#_top
    },
  },
});

const CountryPickerApp = (props:IViewModel): JSX.Element => 
{

  return (
    <QueryClientProvider client={queryClient}>
      <ViewModelProvider viewmodel={props}>
        <IdPrefixProvider value={`countrypicker-${props.instanceid}-`}>
          <FluentProvider theme={props.isDarkMode ? webDarkTheme : webLightTheme}>
            <CountryPickerComboBox></CountryPickerComboBox>
          </FluentProvider>
        </IdPrefixProvider>
        
      </ViewModelProvider>    
    </QueryClientProvider>
  );

} 

export default CountryPickerApp;
