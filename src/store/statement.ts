/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionModel } from "../model/transaction";

const STATEMENT_LOCAL_STORAGE_KEY = 'transact';

function getInitialLocalStorageData() {
    const storedValue = localStorage.getItem(STATEMENT_LOCAL_STORAGE_KEY);
    // const transactions = !storedValue ? [] : JSON.parse(storedValue);
    // transactions.sort((trans) => trans.)
    console.log(storedValue);
    return !storedValue ? [] : JSON.parse(storedValue);
}

const statement = createSlice({
    name: 'statement',
    initialState: getInitialLocalStorageData(),
    reducers: {
        addTransaction: (state, action: PayloadAction<TransactionModel>): any => {
            state.push(action.payload);
        },
        deleteTransaction: (state: TransactionModel[], action: PayloadAction<TransactionModel>): any => {
            console.log("Deleting transaction");
            const transactionToDelete = state.findIndex(transaction => transaction.date === action.payload.date && transaction.amount === action.payload.amount && transaction.type === action.payload.type);
            state.splice(transactionToDelete, 1);
        }
    }
})

export const { addTransaction, deleteTransaction } = statement.actions;
export default statement.reducer;