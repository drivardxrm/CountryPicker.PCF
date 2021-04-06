





import { IInputs } from "../generated/ManifestTypes";


export interface IPcfContextServiceProps{
  context: ComponentFramework.Context<IInputs>;
  onChange: (countrycode:string,countryname:string) => void;
}


export class PcfContextService {
  context: ComponentFramework.Context<IInputs>;
	onChange: (countrycode:string,countryname:string) => void

  constructor(props?:IPcfContextServiceProps) {
    if (props) {
      this.context = props.context;
      this.onChange = props.onChange;
    }

  }

  
}


