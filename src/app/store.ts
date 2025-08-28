import {configureStore} from "@reduxjs/toolkit";
import {counterReducer} from "../features/model/counter-reducer";



export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
