import * as React from 'react';
import  { useState } from 'react';
import { ComboBox, IComboBoxOption,IComboBox} from 'office-ui-fabric-react/lib/index'; 
import { ImageIcon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { initializeIcons } from '@uifabric/icons';


const INITIAL_OPTIONS: IComboBoxOption[] = [
  { key: 'AFG', text: 'Afghanistan' , data: { flag:"https://restcountries.eu/data/afg.svg" } },  
  { key: 'ALA', text: 'Åland Islands' , data: { flag:"https://restcountries.eu/data/ala.svg" } },  
  { key: 'ALB', text: 'Albania' , data: { flag:"https://restcountries.eu/data/alb.svg" } },
  { key: 'CAN', text: 'Canada' , data: { flag:"https://restcountries.eu/data/can.svg" } }
];

export interface ICountryPickerComboBoxProps {
    countryname: string;
    onChange: (countryname:string) => void;
}

const CountryPickerComboBox = (props : ICountryPickerComboBoxProps): JSX.Element => {
    
    const getSelectedKey = (countryname:string) : string | number | undefined => {
        var selectedOption = options.filter(o => o.text === countryname);
        return selectedOption.length === 0 ? undefined : selectedOption[0].key;
    }

    //const [countryname, setCountryName] = useState(props.countryname);
    
    //const [countrykey, setCountryKey] = useState(undefined);
    const [options, setOptions] = useState(INITIAL_OPTIONS); //todo fetch data from api
    const [countrykey, setCountryKey] = useState(getSelectedKey(props.countryname));

    

    const onComboboxChanged = (event: React.FormEvent<IComboBox>,option?:IComboBoxOption|undefined,index? : number | undefined,value? : string | undefined) => { 
        if(option)
        {
            //var newValue = option.key; 
            //setCountryKey(option.key)
            console.log(index + "-" + option.key + "-" + option.text); 
            setCountryKey(option.key);
            props.onChange(option.text);
            
        }  
    } 
  
    const onRenderOption = (option:IComboBoxOption|undefined): JSX.Element => {
        
        return (
        <div>

            {option && option.data && option.data.flag && (
                <ImageIcon style={{ marginRight: '8px', width:25, height:17 }} imageProps={{src:option.data.flag,width:25,height:17}} aria-hidden="true"/>
            )}

            {option && option.text && (
                <span>{option.text}</span>
            )}
            
        </div>
        );
    
    }

    const buttonIconProps = ():IIconProps | undefined  => {
        return countrykey != undefined ? 
            {imageProps:{src:"https://restcountries.eu/data/" + countrykey.toString().toLowerCase() + ".svg",width:25,height:17}} :
            undefined
    }


    initializeIcons();
    return (
        
       
        <ComboBox


            buttonIconProps={buttonIconProps()}
            onRenderOption={onRenderOption}

            
            onChange={onComboboxChanged} 
            
            selectedKey={countrykey}
            allowFreeform={true}
            autoComplete='on'
            options={options}
        />


    );
  
}

export default CountryPickerComboBox;