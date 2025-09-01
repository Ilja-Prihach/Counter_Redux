import { Button } from "./Button";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { setCount, setCounterChanged, setErrorMessage, setInputActive, setMaxValue, setStartValue } from "../../features/model/counter-reducer";
import { Input } from "./Input";

export const Set = () => {
    const dispatch = useAppDispatch();
    const maxValue = useAppSelector((state) => state.counter.maxValue);
    const startValue = useAppSelector((state) => state.counter.startValue);
    const errorMessage= useAppSelector((state) => state.counter.errorMessage);
    const counterChanged = useAppSelector((state) => state.counter.counterChanged);

    useEffect(() => {
        if (startValue >= maxValue || startValue < 0) {
            dispatch(setErrorMessage("Incorrect value"));
        } else {
            dispatch(setErrorMessage(""));
        }
    }, [maxValue, startValue, dispatch]);

    const handleSave = () => {
        localStorage.setItem("saveMaxValue", JSON.stringify(maxValue));
        localStorage.setItem("saveStartValue", JSON.stringify(startValue));
        dispatch(setInputActive(false));
        dispatch(setCount(startValue));
        dispatch(setCounterChanged(false));
    };

    const conditionsSetDisable = maxValue <= startValue || startValue < 0 || !counterChanged || errorMessage !== "";

    return (
        <div className="wrapper_set">
            <div className="wrapper_setValue">
                <Input
                    label="max value"
                    value={maxValue}
                    onChange={(value) => dispatch(setMaxValue(value))}
                    error={!!errorMessage}
                />
                <Input
                    label="start value"
                    value={startValue}
                    onChange={(value) => dispatch(setStartValue(value))}
                    error={!!errorMessage}
                />
            </div>
            <div className="wrapper_button">
                <Button
                    title={"set"}
                    onClick={handleSave}
                    disabled={conditionsSetDisable}
                />
            </div>
        </div>
    );
};