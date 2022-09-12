import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CountryPickerApp from '../CountryPicker/components/CountryPickerApp';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Country Picker/Demo',
  component: CountryPickerApp,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' , maxWidth:'350px'}}>
        {Story()}
      </div>
    )
  ],
  args:{
    countrycode: '',
    language : 'en',
    displayinfo: true
  }
} as ComponentMeta<typeof CountryPickerApp>;

const Template: ComponentStory<typeof CountryPickerApp> = (args) => {
  
  const [, updateArgs] = useArgs();
  args.onChange = (countrycode:string, countryname:string) => {
    console.log(`PCF NotifyOutputChanged  => ${countrycode}:${countryname}`)
    updateArgs({countrycode: countrycode})
  }
  return <CountryPickerApp {...args} />;
} 

export const Default = Template.bind({});

export const Promoted = Template.bind({});
Promoted.args = {
  promoted : ['CAN','USA','MEX']
}

export const Limited = Template.bind({});
Limited.args = {
  limit : ['CAN','USA','MEX']
}

export const Disabled = Template.bind({});
Disabled.args = {
  countrycode : "CAN",
  readonly : true
}

export const Masked = Template.bind({});
Masked.args = {
  countrycode : "CAN",
  masked : true
}



