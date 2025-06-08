# CountryPicker.PCF ![GitHub all releases](https://img.shields.io/github/downloads/drivardxrm/CountryPicker.PCF/total?style=plastic)
Country Picker PCF (PowerApps Component framework) Control that turns a PowerApps text field into a Combobox displaying country names and flags.

* 📚[Try Component in Storybook](https://drivardxrm.github.io/CountryPicker.PCF/)


* Download latest version here : https://github.com/drivardxrm/CountryPicker.PCF/releases/latest

#### IMPORTANT : AS OF v3.0.0.3 - Dependency on restcountries API was removed
🔄 Removed dependency on the RestCountries API
The external API introduced a breaking change, so the control no longer relies on it.

📁 Switched to a local static JSON file for country data
Country names and codes are now loaded from a bundled file. This improves reliability and ensures the control works consistently.

❌ Removed country info feature
Since the local file only contains basic country data, the additional country information feature (e.g., population, region) has been removed. It was useful for demos but didn't add much practical value in real use cases.


#### Features:

* Promote some countries to appear first in the combobox.

* Limit the available countries to show only the one that matters to your use case

* Country names available in several languages. (English, German, Spanish, French, Japanese, Italian, Portuguese, Dutch, Persian)

* Country information comes from this public API project : https://restcountries.com/  
##### DISCLAIMER : The author of the project is not responsible for the accuracy of the content of the API


# Dependencies
FluentUI : https://github.com/microsoft/fluentui

react-query : https://react-query.tanstack.com/

axios: https://axios-http.com/


# Parameters
| Parameter         | Description                                                                                  | Default     |
|-------------------|----------------------------------------------------------------------------------------------|----------   |
| CountryCode  | REQUIRED: Bound Country field (represents ISO 3166-1 3-letter country code)                             |             |
| CountryName  | OPTIONAL OUTPUT: Country name in the chosen language                           |             |
| Language    | Base language for country names. Available languages (English, German, Spanish, French, Japanese, Italian, Portuguese, Dutch, Persian)                                                    | en |
| Promoted   | Promoted countries (Will appear first) *Use comma separated list of ISO 3166-1 3-letter country code* (Ex. 'USA,CAN,MEX') |   |
| Limit    | Limit to these countries *Use comma separated list of ISO 3166-1 3-letter country code* (Ex. 'USA,CAN,MEX'). Leave blank to include all countries|      |
| DisplayInfo   | (DEPRECATED) Display Info Panel  - NOT WORKING ANYMORE  | true        |
| CountryCodeIso2  | OPTIONAL OUTPUT: Bound field to store the 2 character Country Code ISO2                          |             |


# Screenshots
![alt text](https://github.com/drivardxrm/CountryPicker.PCF/blob/master/images/CountryPicker_Main.png?raw=true)

##### Country info panel
![alt text](https://github.com/drivardxrm/CountryPicker.PCF/blob/master/images/CountryPicker_Panel.png?raw=true)

##### Different configurations
![alt text](https://github.com/drivardxrm/CountryPicker.PCF/blob/master/images/CountryPicker_feats.gif?raw=true)

##### Languages
![alt text](https://github.com/drivardxrm/CountryPicker.PCF/blob/master/images/country_picker_lang.gif?raw=true)


# Installation
You can install the component directly from solution files containes in the 'Release' section
https://github.com/drivardxrm/CountryPicker.PCF/releases

# Get required tools

To use Microsoft PowerApps CLI, do the following:

* Install Npm (comes with Node.js) or install Node.js (comes with npm). We recommend LTS (Long Term Support) version 10.15.3 LTS as it seems to be most stable.

* Install .NET Framework 4.6.2 Developer Pack.

* If you don’t already have Visual Studio 2017 or later, follow one of the options below:

  * Option 1: Install Visual Studio 2017 or later.
  * Option 2: Install .NET Core 2.2 SDK and then install Visual Studio Code.
* Install Microsoft PowerApps CLI.

Be sure to update your Microsoft PowerApps CLI to the latest version: 
```bash
pac install latest
```
# Build the control

* Clone the repo/ download the zip file.
* Navigate to ./IconTwoOption/ folder.
* Copy the folder path and open it in visual studio code.
* Open the terminal, and run the command the following command to install the project dependencies:
```bash
npm install
```
Then run the command:
```bash
npm run start
```
# Build the solution

* Create a new solution folder and open the Developer command prompt.
* Change the directory to the newly created folder in previous step.
* Init the future solution:
```bash
pac solution init --publisherName someName --customizationPrefix someSolutionPrefix
``` 
* Add the control to your future solution:
```bash
pac solution add-reference --path provide path of control project folder where the pcf.proj is available
``` 
* Build 1/2:
```bash
msbuild /t:restore
``` 
* Build 2/2:
```bash
msbuild
``` 
* You will have the solution file in SolutionFolder/bin/debug folder!

If you want to change the solution type you have to edit the .cdsproj file:
```bash
Solution Packager overrides, un-comment to use: SolutionPackagerType (Managed, Unmanaged, Both)
  <PropertyGroup>
    <SolutionPackageType>Managed</SolutionPackageType>
  </PropertyGroup>

  ```
 
 

