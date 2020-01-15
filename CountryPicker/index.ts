import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CountryPickerComboBox, {ICountryPickerComboBoxProps} from "./CountryPickerComboBox"


export class CountryPicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _selectedCode: string;
	private _selectedName: string;

	private _notifyOutputChanged:() => void;
	private _container: HTMLDivElement;
	private _props: ICountryPickerComboBoxProps = { 
													countrycode: "",
													language:"en", 
													promoted:undefined,
													limit:undefined,
													displayinfo:true,
													readonly:true,
													masked:false,
													onChange : this.notifyChange.bind(this)
												};

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._notifyOutputChanged = notifyOutputChanged;
		this._container = document.createElement("div");
		

		container.appendChild(this._container);

		
	}

	private notifyChange(selectedCode: string, selectedName:string) {

		this._selectedCode = selectedCode;
		this._selectedName = selectedName;
		this._notifyOutputChanged();

	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		//Visibility of the main attribute on the form
		let isVisible = context.mode.isVisible 
		
		// If the bound attribute is disabled because it is inactive or the user doesn't have access
		let isReadOnly = context.mode.isControlDisabled;

		let isMasked = false;
		// When a field has FLS enabled, the security property on the attribute parameter is set
		if (context.parameters.countrycode.security) {
			isReadOnly = isReadOnly || !context.parameters.countrycode.security.editable;
			isVisible = isVisible && context.parameters.countrycode.security.readable;
			isMasked = isVisible && !context.parameters.countrycode.security.readable
		}

		if(!isVisible){
			return;
		}
		
		this._selectedCode = context.parameters.countrycode.raw || "";

		//Prepare props for component rendering
		this._props.countrycode = this._selectedCode;
		this._props.language = context.parameters.language.raw || "en";
		this._props.promoted = context.parameters.promoted.raw?.split(',') || undefined;
		this._props.displayinfo = context.parameters.displayinfo.raw === "true"
		//harness will put 'val' by default so I want to treat this value as null
		this._props.limit = context.parameters.limit.raw == "val" ? undefined : context.parameters.limit.raw?.split(',') || undefined;
		this._props.readonly = isReadOnly;
		this._props.masked = isMasked;

		// RENDER React Component
		ReactDOM.render(
			React.createElement(CountryPickerComboBox,this._props)
			, this._container
		);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			countrycode: this._selectedCode,
			countryname: this._selectedName
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}