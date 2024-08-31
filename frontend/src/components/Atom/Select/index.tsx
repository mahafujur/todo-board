import React from 'react';

interface SelectProps {
    value: string[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    multiple?: boolean;
    className?: string;
    options?: string[]
}

const Select: React.FC<SelectProps> = ({value, onChange, multiple, className, options}) => {
    return (
        <select
            value={value}
            onChange={onChange}
            multiple={multiple}
            className={`border rounded p-2 ${className}`}
        >
            {options?.map((name) => {
                return <option value={name}>{name}</option>
            })}
        </select>
    );
};

export default Select;
