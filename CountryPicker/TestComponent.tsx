import * as React from 'react';
import { ComboBox, IComboBoxOption,IComboBox } from 'office-ui-fabric-react/lib/index'; ;
import { Icon, ImageIcon } from 'office-ui-fabric-react/lib/Icon';

const INITIAL_OPTIONS: IComboBoxOption[] = [
  { key: 'AFG', text: 'Afghanistan' , data: { flag:"https://restcountries.eu/data/afg.svg" } },  
  { key: 'ALA', text: 'Åland Islands' , data: { flag:"https://restcountries.eu/data/ala.svg" } },  
  { key: 'ALB', text: 'Albania' , data: { flag:"https://restcountries.eu/data/alb.svg" } },
  { key: 'CAN', text: 'Canada' , data: { flag:"https://restcountries.eu/data/can.svg" } }
];



export class ComboExample extends React.Component<any> {
  
  constructor(props : any) { 
    super(props); 
    //initializeIcons();
    this.state = { 
      value: null, 
      selectedItem: null, 
      flag: null
    }; 
  } 

  _onComboboxChanged(event: React.FormEvent<IComboBox>,option?:IComboBoxOption|undefined,index? : number | undefined,value? : string | undefined) { 
    if(option)
    {
      var newValue = option.key; 
      this.setState( { selectedItem: newValue} ); 
      console.log(newValue); 
    }  
    if(index){console.log(index);}
    
} 
  
  _onRenderOption(option:IComboBoxOption|undefined): JSX.Element {
    
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



  public render() {
    const state = this.state;
    return (
       

        <ComboBox
          //label="ComboBox with toggleable freeform/auto-complete"
          buttonIconProps={{imageProps:{src:"https://restcountries.eu/data/can.svg",width:25,height:17}}}
          onRenderOption={this._onRenderOption.bind(this)}

          //onRenderItem={this._onRenderOption.bind(this)}
          //onRenderItem={this._onRenderOption.bind(this)}
          //onResolveOptions={this._onRenderList.bind(this)}
          
          onChange={ this._onComboboxChanged.bind(this) } 
          //selectedKey="AFG"
          allowFreeform={false}
          autoComplete='on'
          options={INITIAL_OPTIONS}
        />

    );
  }
}