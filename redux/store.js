import { configureStore } from "@reduxjs/toolkit";
import purchaseSlice from "./features/purchase/purchaseSlice";

let store = configureStore({
    reducer : {
        purchase : purchaseSlice
    }
})

export default store;