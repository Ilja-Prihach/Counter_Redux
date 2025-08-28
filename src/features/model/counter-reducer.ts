import {createAction, createReducer, PayloadAction} from "@reduxjs/toolkit";


type CounterState = {
    startValue: number
    maxValue: number
    count: number
    errorMessage: string
    inputActive: boolean
    counterChanged: boolean
}
// Вместо useEffect в компоненте Set
const getValuesFromStorage = (keyForLS: string, initialValue: number ): number => {
    const saveValue = localStorage.getItem(keyForLS);
    let parsedValue
    if (saveValue) {
        parsedValue = JSON.parse(saveValue)
    }
    return parsedValue || initialValue;
}

let initialStartValueCounter = 0
let initialMaxValueCounter = 5

const initialState: CounterState = {
    // startValue: initialStartValueCounter,
    startValue: getValuesFromStorage('saveStartValue',initialStartValueCounter ),
    // maxValue: initialMaxValueCounter,
    maxValue: getValuesFromStorage('saveMaxValue',initialMaxValueCounter),
    // count: initialStartValueCounter,
    count: getValuesFromStorage('saveStartValue',initialStartValueCounter ),
    errorMessage: "",
    inputActive: false,
    counterChanged: false,
}

export const increment = createAction('counter/increment')
export const resetCount = createAction('counter/reset');
export const setStartValue = createAction<number>('counter/setStartValue');
export const setMaxValue = createAction<number>('counter/setMaxValue');
export const setErrorMessage = createAction<string>('counter/setErrorMessage');
export const setInputActive = createAction<boolean>('counter/setInputActive');
export const setCounterChanged = createAction<boolean>('counter/setCounterChanged');
export const setCount =  createAction<number>('counter/setCount');

export const counterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(increment, (state) => {
            state.count += 1;
        })
        .addCase(resetCount, (state) => {
            state.count = state.startValue
        })
        .addCase(setCount, (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        })
        .addCase(setStartValue, (state, action: PayloadAction<number>) => {
            state.startValue = action.payload
        })
        .addCase(setMaxValue, (state, action: PayloadAction<number>) => {
            state.maxValue = action.payload
        })
        .addCase(setErrorMessage, (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        })
        .addCase(setInputActive, (state, action: PayloadAction<boolean>) => {
            state.inputActive = action.payload
        })
        .addCase(setCounterChanged, (state, action: PayloadAction<boolean>) => {
            state.counterChanged = action.payload
        })
});