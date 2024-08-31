import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Icon from "@/Icons";

interface EditableInputProps {
    initialValue?: string;
    onSave: (value: string) => void;
    placeholder?: string;
    inputStyle?: string;
    textStyle?: string;
    background?: string;
    focusStyle?: string;
    hideEditIcon?:boolean;
}

const EditableInput: React.FC<EditableInputProps> = ({
                                                         initialValue = '',
                                                         onSave,
                                                         placeholder = '',
                                                         inputStyle = '',
                                                         textStyle = '',
                                                         background = '',
                                                         focusStyle = '',
                                                         hideEditIcon=false
                                                     }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(initialValue);

    const handleTextClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSave = () => {
        setIsEditing(false);
        if (inputValue !== initialValue) {
            onSave(inputValue);  // Call the save function passed in props
        }
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div className={`w-full flex gap-x-1  items-center justify-between ${background}`}>
            {isEditing ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleSave}
                    onKeyPress={handleKeyPress}
                    className={`border border-gray-300 rounded w-full px-2 py-1 ${inputStyle} ${isEditing ? focusStyle : ''}`}
                    placeholder={placeholder}
                    autoFocus
                />
            ) : (
                <div className={'w-full flex items-center justify-between cursor-pointer'} onClick={handleTextClick}>
                    <h2
                        className={`${textStyle}`}
                    >
                        {inputValue || placeholder}
                    </h2>

                    {hideEditIcon? null : <Icon name={'editIcon'} className={' w-[18px] h-[18px] '}/> }
                </div>
            )}
        </div>
    );
};

export default EditableInput;
