import { configureStore } from "@reduxjs/toolkit";
import statementReducer from "./statement";

const store = configureStore({
    reducer: {
        statement: statementReducer
    }
});

export default store;