import React from 'react';

interface DatePickerProps {
    selected?: Date;
    onChange: (date: Date | null) => void;
    className?: string;
    placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ selected, onChange, className, placeholder }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value ? new Date(event.target.value) : null;
        onChange(date);
    };

    return (
        <input
            type="date"
            value={selected ? selected.toISOString().split('T')[0] : ''}
            onChange={handleChange}
            className={`border rounded p-2 ${className}`}
            placeholder={placeholder}
        />
    );
};

export default DatePicker;
