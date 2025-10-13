import * as React from "react";

import { useFilteredCountries } from "../hooks/useCountries";
import { useViewModel } from "../services/ViewModelProvider";
import { ChangeEvent, MouseEventHandler, useEffect, useMemo,  useState } from "react";
import { Button, Image,  Input,  mergeClasses, Spinner, Tag, TagPicker, TagPickerControl, TagPickerGroup, TagPickerInput, TagPickerList, TagPickerOption, TagPickerProps, useTagPickerFilter } from "@fluentui/react-components";
import { ChevronDown20Regular, DismissRegular } from '@fluentui/react-icons';
import { useStyles } from "../styles/styles";
import { GetCountryName, sortByCountryName, sortByPromoted } from "../utils/CountryUtils";




const CountryPicker = ():JSX.Element => {

    const vm = useViewModel();

    const styles = useStyles()
    
  
    const { countries, status, error, isFetching } = useFilteredCountries();
    const [selectedOption, setSelectedOption] = useState<
        string | undefined
    >(vm.countrycode ?? undefined);
    const [query, setQuery] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);
    const [isInputFocused, setInputFocused] = useState(false);
    const [isDisabled, setIsDisabled] = useState(vm.readonly)
    

    // if value is changed outside of PCF
    useEffect(
        () => {
        if (status === 'success' &&
                vm.countrycode !== selectedOption) {
            setSelectedOption(vm.countrycode)
        }
    }
    , [status, vm.countrycode]);

    // Signal back to Form 
    useEffect(
        () => {
        if (status === 'success' && selectedOption === undefined) {
            vm.onChange("","","")
        }else if(status === 'success' && selectedOption !== vm.countrycode){
            let country = countries.find((option) => option.cca3 === selectedOption)
            vm.onChange(country?.cca3!,GetCountryName(country!, vm.language),country?.cca2!)
        }
        }
        , [selectedOption])

    const selectedOptions = useMemo(
        () => (selectedOption ? [selectedOption] : []),
        [selectedOption]
    );

    const onOptionSelect: TagPickerProps["onOptionSelect"] = (e, data) => {
        if (data.value === 'no-matches') {
            setQuery('')
            setInputFocused(false)
            return;
        }
        
        if(data.value === undefined || data.value === '-1'){
            setSelectedOption(undefined)
        }
        else if(data.value !== undefined && data.value !== vm.countrycode){
            setSelectedOption(data.value)
        }
        setQuery('');
        setInputFocused(false);
    }; 
    
    const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        setInputFocused(e.target.value != ''); // if there is a value in the input, set to true (will hide the selected tag)
        setQuery(e.target.value)    
    };

    const handleClear: MouseEventHandler = (event) => {
        setSelectedOption(undefined)
    };

    const handleBlur = () => {
        setQuery('')
        setInputFocused(false)
    };

    const placeholder = useMemo(
        () => selectedOption === undefined ? '---' : '',
        [selectedOption]
    );

    const children = useTagPickerFilter({
        query,
        options: countries
            .sort(sortByCountryName(vm.language))
            .sort(sortByPromoted(vm.promoted))
            .map((option) => option.cca3),
        noOptionsElement: (
        <TagPickerOption value="no-matches">
            {'**no match**'}
        </TagPickerOption>
        ),
        renderOption: (optionidToRender) => (
            <TagPickerOption
                className={mergeClasses(
                styles.tagPickerOption, 
                optionidToRender === selectedOption ? styles.tagSelected : '')
                }
                media={
                    
                    <Image
                        className={styles.tagPickerOption}
                        alt={GetCountryName(countries.find((option) => option.cca3 === optionidToRender)!, vm.language)}
                        key={countries.find((option) => option.cca3 === optionidToRender)?.cca3}
                        shape="square"
                        src={countries.find((option) => option.cca3 === optionidToRender)?.flags.png}
                        //height={24}
                        width={30}
                    />
                }
                text={GetCountryName(countries.find((option) => option.cca3 === optionidToRender)!, vm.language) ?? ''}
                value={optionidToRender}
                key={optionidToRender}
            >
                {GetCountryName(countries.find((option) => option.cca3 === optionidToRender)!, vm.language) ?? ''}
            </TagPickerOption>
        ),

        filter: (option) =>
        (GetCountryName(countries.find((o) => o.cca3 === option)!, vm.language).toLowerCase().includes(query.toLowerCase()) ?? false)
    });

    //MAIN RENDERING
    if(status === 'pending' || isFetching){
        return <Spinner size='tiny' appearance='primary' label={'Loading...'} />
    }if(status === 'error'){
        return <div>Error fetching data...{error?.message}</div>
    }if(vm.masked){ 
        return (
            <div className={styles.tagpicker}>
                <Input 
                    className={mergeClasses(styles.tagPickerControl, styles.tagPickerControlDisabled)}
                    type="password" 
                    defaultValue="password" 
                    id={vm.instanceid} 
                    disabled={true} 
                    appearance="filled-darker"
                />
            </div>
        )
    }else
        return (
            <div className={styles.tagpicker}>
                {countries  &&
                    <TagPicker
                        onOptionSelect={onOptionSelect}
                        selectedOptions={selectedOptions}
                        appearance={'filled-darker'}
                        disabled={isDisabled}
                    >
                        <TagPickerControl 
                        className={mergeClasses(
                            styles.tagPickerControl, 
                            !selectedOption ? styles.tagPickerControlEmpty : '',
                            isDisabled ? styles.tagPickerControlDisabled : '')
                        }
                        onMouseEnter={()=>{setIsFocused(true)}} 
                        onMouseLeave={()=>{setIsFocused(false)}}
                        expandIcon={<ChevronDown20Regular className={isFocused ? styles.elementVisible : styles.elementHidden}/>}
                        secondaryAction={
                            selectedOption && !vm.readonly && !vm.masked  ?
                            
                                <Button
                                className={mergeClasses(
                                    styles.clearButton, 
                                    isFocused ? styles.elementVisible : styles.elementHidden)
                                }
                                appearance="transparent"
                                size="small"
                                shape="rounded"
                                onClick={handleClear}
                                icon={<DismissRegular/>}
                                >
                                
                                </Button>
                            :
                            null 
                        }
                        >
                        {selectedOption && (
                            <TagPickerGroup 
                            className={mergeClasses(
                                styles.tagPickerGroup, 
                                isInputFocused ? styles.tagPickerGroupHidden : styles.tagPickerGroupVisible)
                            }>
                                <Tag
                                    key={selectedOption}
                                    className={mergeClasses(
                                    styles.tag,
                                    isDisabled ? styles.tagDisabled : '',
                                    )}
                                    shape={'rounded'}
                                    size={'medium'}
                                    appearance={'outline'}
                                    media={
                                        <Image
                                            alt={GetCountryName(countries.find((option) => option.cca3 === selectedOption)!, vm.language)}
                                            key={countries.find((option) => option.cca3 === selectedOption)?.cca3}
                                            shape="square"
                                            src={countries.find((option) => option.cca3 === selectedOption)?.flags.png}
                                            //height={24}
                                            width={30}
                                        />
                                    
                                    }
                                    value={selectedOption}
                                    title={GetCountryName(countries.find((option) => option.cca3 === selectedOption)!, vm.language) ?? ''}
                                    dismissible = {false}
                                    primaryText={{className: styles.tagOverflow }}
                                    color='brand'
                                >
                                    {GetCountryName(countries.find((option) => option.cca3 === selectedOption)!, vm.language) ?? ''}
                                </Tag>
                            </TagPickerGroup>
                        )}
                
                        <TagPickerInput 
                            className={styles.tagPickerInput}
                            aria-label={"Select country"}
                            placeholder={placeholder}
                            value={query}
                            onChange={handleOnChange} 
                            onBlur={handleBlur}
                            clearable={true}
                        />
                        </TagPickerControl>
                        <TagPickerList>
                            {children}
                        </TagPickerList>
                    </TagPicker>
            }
            </div>
        ) 
       

}

export default CountryPicker;