import {Button} from "./Button";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {
    setCount, setCounterChanged,
    setErrorMessage,
    setInputActive,
    setMaxValue,
    setStartValue
} from "../../features/model/counter-reducer";



export const Set = () => {
    const dispatch = useAppDispatch();
    // каждый раз длставать по ожной штуке
    const {
        maxValue,
        startValue,
        errorMessage,
        counterChanged
    } = useAppSelector((state) => state.counter);

    useEffect(() => {
        if (startValue >= maxValue || startValue < 0) {
            dispatch(setErrorMessage("Incorrect value"));
        } else {
            dispatch(setErrorMessage(""));
        }
    }, [maxValue, startValue, dispatch]);

    // useEffect(() => {
    //     const savedMaxValue = localStorage.getItem("saveMaxValue");
    //     const savedStartValue = localStorage.getItem("saveStartValue");
    //
    //     if (savedMaxValue) {
    //         dispatch(setMaxValue(JSON.parse(savedMaxValue)));
    //     }
    //     if (savedStartValue) {
    //         const parsedStartValue = JSON.parse(savedStartValue);
    //         dispatch(setStartValue(parsedStartValue));
    //         dispatch(setCount(parsedStartValue));
    //     }
    // }, [dispatch]);





    const handleStartValueChange = (value: number) => {
        dispatch(setStartValue(value));
        dispatch(setInputActive(true));
        dispatch(setCounterChanged(false));
    };

    const handleMaxValueChange = (value: number) => {
        dispatch(setMaxValue(value));
        dispatch(setInputActive(true));
        dispatch(setCounterChanged(false));
    };

    const handleSave = () => {
        localStorage.setItem("saveMaxValue", JSON.stringify(maxValue));
        localStorage.setItem("saveStartValue", JSON.stringify(startValue));


        dispatch(setInputActive(false));
        dispatch(setCount(startValue));
        dispatch(setCounterChanged(false));
    };

    const conditionsSetDisable =
        maxValue <= startValue ||
        startValue < 0 ||
        counterChanged ||
        errorMessage !== "";

    return (
        <div className="wrapper_set">
            <div className="wrapper_setValue">
                <div>
                    <span>max value</span>
                    {/*вынести в компоненту инпут*/}
                    <input
                        type="number"
                        value={maxValue}
                        onFocus = {() => dispatch(setInputActive(true))}
                        onChange={(e) => handleMaxValueChange(+e.target.value)}
                        style={{
                            borderColor: errorMessage ? "red" : "#ccc",
                        }}
                    />
                </div>
                <div>
                    <span>start value</span>
                    <input
                        type="number"
                        value={startValue}
                        onFocus = {() => dispatch(setInputActive(true))}
                        onChange={(e) => handleStartValueChange(Number(e.target.value))}
                        style={{
                            borderColor: errorMessage ? "red" : "#ccc",
                        }}
                    />
                </div>
            </div>
            <div className="wrapper_button">
                <Button
                    title={"set"}
                    onClick={handleSave}
                    disabled={conditionsSetDisable}
                />
            </div>
        </div>

    )
}
