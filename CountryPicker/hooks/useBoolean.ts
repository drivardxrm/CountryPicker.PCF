import { useState } from "react";

//taken from : https://daveceddia.com/custom-hooks/
//you can use like this and rename the members when deconstructing for a cleaner implementation.
//ex : const [isVisible, showPanel, hidePanel] = useBoolean(initialValue);

export const useBoolean = (initialValue:boolean):[boolean, () => void, () => void] =>{
  const [value, setValue] = useState<boolean>(initialValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, setTrue, setFalse];
}