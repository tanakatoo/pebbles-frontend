import React from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import Dropdown from "./Dropdown";
import Radio from "./Radio";
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker";
import Autocomplete from "./Autocomplete"
import Hidden from "./Hidden";
import Toggle from "./Toggle";
import DropdownMultiple from "./DropdownMultiple";

// decide which of the different form fields should be rendered

const FormikControl = ({ control, ...rest }) => {

    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <Textarea {...rest} />
        case 'dropdown':
            return <Dropdown {...rest} />
        case 'radio':
            return <Radio {...rest} />
        case 'checkbox':
            return <Checkbox {...rest} />
        case 'date':
            return <DatePicker {...rest} />
        case 'autocompleteApi':
            return <Autocomplete {...rest} />
        case 'toggle':
            return <Toggle {...rest} />
        case 'hidden':
            return <Hidden {...rest} />
        case 'listbox':
            return <DropdownMultiple {...rest} />
        default:
            return null
    }

}

export default FormikControl