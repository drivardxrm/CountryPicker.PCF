import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';

import CountryPickerApp from "./components/CountryPickerApp";
import IViewModel from "./services/ViewModel";


export class CountryPicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _root: Root;
	private _isDesignMode: boolean
	private _selectedCode: string;
	private _selectedName: string;

	private _notifyOutputChanged:() => void;

	private _viewmodel: IViewModel = { 
										//properties
										countrycode: "",
										language:"en", 
										promoted:undefined,
										limit:undefined,
										displayinfo:true,
										readonly:true,
										masked:false,
										//React component callback
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
		this._root = createRoot(container!)

		//https://butenko.pro/2023/01/08/pcf-design-time-vs-run-time/
        if (location.ancestorOrigins?.[0] === "https://make.powerapps.com" ||
            location.ancestorOrigins?.[0] === "https://make.preview.powerapps.com") {
            this._isDesignMode = true;
        }
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
		// If the bound attribute is disabled because it is inactive or the user doesn't have access
		let isReadOnly = context.mode.isControlDisabled;

		let isMasked = false;
		// When a field has FLS enabled, the security property on the attribute parameter is set
		if (context.parameters.countrycode.security) {
			isReadOnly = isReadOnly || !context.parameters.countrycode.security.editable;
			isMasked =  !context.parameters.countrycode.security.readable
		}
		
		this._selectedCode = context.parameters.countrycode.raw || "";

		//Prepare ViewModel
		this._viewmodel.countrycode = this._isDesignMode ? 
												"CAN" : 				   // Design mode 
												this._selectedCode;    // Run mode
		this._viewmodel.language = context.parameters.language?.raw || "en";
		this._viewmodel.promoted = context.parameters.promoted?.raw?.split(',') || undefined;
		this._viewmodel.displayinfo = context.parameters.displayinfo?.raw === "true"
		//harness will put 'val' by default so I want to treat this value as null
		this._viewmodel.limit = context.parameters.limit?.raw == "val" ? undefined : context.parameters.limit?.raw?.split(',') || undefined;
		this._viewmodel.readonly = isReadOnly;
		this._viewmodel.masked = isMasked;

		// RENDER React Component
		this._root.render(createElement(CountryPickerApp, this._viewmodel)) 

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
		this._root.unmount();
	}

	
}