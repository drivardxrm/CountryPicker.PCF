import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { fn } from 'storybook/test';

import CountryPickerApp from '../CountryPicker/components/CountryPickerApp';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/CountryPicker',
  component: CountryPickerApp,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' , maxWidth:'500px'}}>
        {Story()}
      </div>
    )
  ], 

  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    controls:{
        exclude: ['instanceid','onChange','displayinfo', 'promoted', 'limit', 'countrycode' ]
    }
  },
  
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
     countrycode: { type: 'string', defaultValue: '' },
     promoted: { control: 'object' },
     limit: { control: 'object' },

  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
      instanceid: 'storybook-instance',
      isDarkMode: false,
      readonly: false,
      masked: false,
      promoted:[],
      limit: undefined,
      countrycode: '',
      language : 'en',
      displayinfo: true,
      onChange: (countrycode:string, countryname:string, countrycodeiso2:string) => {
        console.log(`PCF NotifyOutputChanged  => ${countrycode}:${countryname}`)
      },
    },
} satisfies Meta<typeof CountryPickerApp>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    
  },
};

export const Selected: Story = {
  args: {
    countrycode: 'CAN',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Disabled: Story = {
  args: {
    readonly: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    readonly: true,
    countrycode: 'CAN',
  },
};

export const Masked: Story = {
  args: {
    masked: true,
  },
};

export const Limit: Story = {
  args: {
    limit: ['USA','CAN','MEX'],
  },
};

export const Promoted: Story = {
  args: {
    promoted:['USA','CAN','MEX'],
  },
};

export const French: Story = {
  args: {
    countrycode: 'FRA',
    language : 'fr',
   
  },
};

export const German: Story = {
  args: {
    countrycode: 'DEU',
    language : 'de',
   
  },
};

export const Spanish: Story = {
  args: {
    countrycode: 'ESP',
    language : 'es',
   
  },
};

export const Persian: Story = {
  args: {
    countrycode: 'IRN',
    language : "fa",
   
  },
};

export const Italian: Story = {
  args: {
    countrycode: 'ITA',
    language : 'it',
   
  },
};

export const Japanese: Story = {
  args: {
    countrycode: 'JPN',
    language : 'ja',
   
  },
};

export const Dutch: Story = {
  args: {
    countrycode: 'NLD',
    language : 'nl',
   
  },
};

export const Portugese: Story = {
  args: {
    countrycode: 'PRT',
    language : 'pt',
   
  },
};



