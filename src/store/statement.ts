/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../model/transaction";

const statement = createSlice({
    name: 'statement',
    initialState: [] as Transaction[],
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>): any => {
            state.push(action.payload);
        }
    }
})

export const { addTransaction } = statement.actions;
export default statement.reducer;