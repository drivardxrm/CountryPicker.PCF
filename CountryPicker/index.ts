import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ComboExample} from "./TestComponent";
import App from "./StateHook";
import CountryPickerComboBox, {ICountryPickerComboBoxProps} from "./CountryPickerComboBox"
import { strict } from "assert";

export class CountryPicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _selected: string|undefined;

	private _notifyOutputChanged:() => void;
	private _container: HTMLDivElement;
	private _props: ICountryPickerComboBoxProps = { 
													countryname: "",
													language:"en", 
													promoted:undefined,
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

	private notifyChange(selected: string|undefined) {
		
		this._selected = selected;
		this._notifyOutputChanged();
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._selected = context.parameters.country.raw || "";

		this._props.countryname = this._selected;
		this._props.language = context.parameters.language.raw || "en";
		this._props.promoted = context.parameters.promoted.raw?.split(',') || undefined;

		// Add code to update control view
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
			country: this._selected
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