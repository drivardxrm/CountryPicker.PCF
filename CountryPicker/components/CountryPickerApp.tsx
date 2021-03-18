import { initializeIcons } from "@fluentui/react/lib/Icons";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";


import CountryPickerComboBox, { ICountryPickerComboBoxProps } from "./CountryPickerComboBox";
//initilize icons
initializeIcons();

// export interface ICountryPickerAppProps {
//   pcfcontext: ComponentFramework.Context<IInputs>;
//   onChange: (countrycode: string, countryname: string) => void;
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      //IMPORTANT otherwise data will be refreshed everytime the focus on the PCF is lost and regained 
      //https://react-query.tanstack.com/guides/window-focus-refetching#_top
    },
  },
});

const CountryPickerApp = (props: ICountryPickerComboBoxProps): JSX.Element => (
  <QueryClientProvider client={queryClient}>
      <CountryPickerComboBox {...props}></CountryPickerComboBox>
  </QueryClientProvider>
);

export default CountryPickerApp;
