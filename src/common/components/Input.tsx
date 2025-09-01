import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setInputActive, setCounterChanged } from '../../features/model/counter-reducer';

type InputProps = {
    value: number;
    onChange: (value: number) => void;
    label: string;
    error?: boolean;
};

export const Input: React.FC<InputProps> = ({ value, onChange, label, error = false }) => {
    const dispatch = useAppDispatch();
    const [displayValue, setDisplayValue] = useState<string>(value.toString());


    useEffect(() => {
        setDisplayValue(value.toString());
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = +e.target.value;
        onChange(inputValue);
        dispatch(setInputActive(true));
        dispatch(setCounterChanged(true));
    };

    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === '.' || e.key === ',') {
            e.preventDefault();
        }
        if (e.key === '0' && displayValue === '0') {
            e.preventDefault();
        }
    };

    const handleFocus = () => {
        dispatch(setInputActive(true));
    };


    return (
        <div>
            <span>{label}</span>
            <input
                type="number"
                value={displayValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyPress}
                //onBlur={handleBlur}
                style={{
                    borderColor: error ? 'red' : '#ccc',
                }}
            />
        </div>
    );
};


// const handleBlur = () => {
//     const finalCleanedValue = displayValue.replace(/^0+/, '') || '0';
//     if (displayValue !== finalCleanedValue) {
//         setDisplayValue(finalCleanedValue);
//         const num = Number(finalCleanedValue) || 0;
//         onChange(num);
//     }
// };
