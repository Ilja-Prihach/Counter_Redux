import {useEffect, useState} from "react";
import {Button} from "./Button";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {increment, resetCount, setCounterChanged} from "../../features/model/counter-reducer";
// import {ProgressBar} from "./ProgressBar";
// import {Count}  from "./Count";



export const Counter = () => {
    const dispatch = useAppDispatch();
    const {
        count,
        maxValue,
        startValue,
        errorMessage,
        inputActive
    } = useAppSelector((state) => state.counter);



    const inc = () => {
        if (count < maxValue) {
            dispatch(increment());
            dispatch(setCounterChanged(true))
        }
    };

    const reset = () => {
            dispatch(resetCount())
    };

    const isMaxValueReached =  count === maxValue;

    const conditionsIncDisabled = inputActive || count >= maxValue
    const conditionsResetDisabled =  inputActive || count === startValue
    return (
        <div className="wrapper_set">
            <div className="wrapper_setValue">
                {errorMessage ? (
                    <div className="error">
                        {errorMessage}
                    </div>
                ) : inputActive ? (
                    <div>Enter values and press 'set'</div>
                ) : isMaxValueReached ? (
                    <p style={{color: "red"}}>Maximum value reached!</p>
                ) : (
                    <div className="count">{count}</div>
                )}
            </div>

            <div className="wrapper_button">
                <Button
                    title={" inc "}
                    onClick={inc}
                    disabled={conditionsIncDisabled}
                />
                <Button
                    title={" reset "}
                    onClick={reset}
                    disabled={conditionsResetDisabled}
                />
            </div>
        </div>
    );
};
