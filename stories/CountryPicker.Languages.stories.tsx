import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CountryPickerApp from '../CountryPicker/components/CountryPickerApp';
import { useArgs } from '@storybook/client-api';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Country Picker/Languages',
  component: CountryPickerApp,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' , maxWidth:'350px'}}>
        {Story()}
      </div>
    )
  ],
  args:{
    countrycode: 'CHE',  // switzerland
    language : 'en',
    displayinfo: true
  }
} as ComponentMeta<typeof CountryPickerApp>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CountryPickerApp> = (args) => {
  
  const [, updateArgs] = useArgs();
  args.onChange = (countrycode:string, countryname:string) => {
    console.log(`PCF NotifyOutputChanged  => ${countrycode}:${countryname}`)
    updateArgs({countrycode: countrycode})
  }
  return <CountryPickerApp {...args} />;
} 

export const English = Template.bind({});

export const French = Template.bind({});
French.args = {
  language: 'fr'
}

export const German = Template.bind({});
German.args = {
  language: 'de'
}

export const Spanish = Template.bind({});
Spanish.args = {
  language: 'es'
}

export const Italian = Template.bind({});
Italian.args = {
  language: 'it'
}

export const Portugese = Template.bind({});
Portugese.args = {
  language: 'pt'
}

export const Dutch = Template.bind({});
Dutch.args = {
  language: 'nl'
}

export const Japanese = Template.bind({});
Japanese.args = {
  language: 'ja'
}

export const Persian = Template.bind({});
Persian.args = {
  language: 'fa'
}




