import { IComboBoxOption } from "@fluentui/react/lib/ComboBox";



//Sort functions for combobox options
export const sortByOptionText = (a:IComboBoxOption,b:IComboBoxOption):number => {

    if (a.text > b.text) return 1;
    if (b.text > a.text) return -1;
  
    return 0;
}
  
// Bubble up 'promoted' keys list to be on top. 
export function sortByPromoted(promoted:string[]) {
    return function (a:IComboBoxOption,b:IComboBoxOption):number {

        const last = promoted?.length ?? 0;
        const keya = a.key.toString();
        const keyb = b.key.toString();

        const ranka = promoted.includes(keya) ? promoted.indexOf(keya) : last;
        const rankb = promoted.includes(keyb) ? promoted.indexOf(keyb) : last;
            
        if (ranka > rankb) return 1;
        if (rankb > ranka) return -1;
        
        return 0;
    };
}




