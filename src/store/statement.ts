/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionModel } from "../model/transaction";

const STATEMENT_LOCAL_STORAGE_KEY = 'transact';

function getInitialLocalStorageData() {
    const storedValue = localStorage.getItem(STATEMENT_LOCAL_STORAGE_KEY);
    return !storedValue ? [] : JSON.parse(storedValue);
}

const statement = createSlice({
    name: 'statement',
    initialState: getInitialLocalStorageData(),
    reducers: {
        addTransaction: (state, action: PayloadAction<TransactionModel>): any => {
            state.push(action.payload);
        }
    }
})

export const { addTransaction } = statement.actions;
export default statement.reducer;