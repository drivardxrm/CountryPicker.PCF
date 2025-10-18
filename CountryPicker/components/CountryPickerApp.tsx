
import * as React from "react";
import IViewModel from "../services/ViewModel";
import {ViewModelProvider} from "../services/ViewModelProvider";



import { FluentProvider, IdPrefixProvider, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import CountryPicker from "./CountryPicker";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

// declare outside of FC element so it doesnt gets evaluated at each rerenders
const queryClient = new QueryClient({
  queryCache: new QueryCache(), // creates a new querycahe for each instance of the control on a page
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false
      // IMPORTANT otherwise data will be refreshed everytime the focus on the PCF is lost and regained
      // https://react-query.tanstack.com/guides/window-focus-refetching#_top
    }
  }
})



const CountryPickerApp = (props:IViewModel): React.JSX.Element => 
{

  return (
    <QueryClientProvider client={queryClient}>
        <ViewModelProvider viewmodel={props}>
          <IdPrefixProvider value={`countrypicker-${props.instanceid}`}>
            <FluentProvider theme={props.isDarkMode ? webDarkTheme : webLightTheme}>
              <CountryPicker/>
            </FluentProvider>
          </IdPrefixProvider>
          
        </ViewModelProvider>    
    </QueryClientProvider>
  );

} 

export default CountryPickerApp;
