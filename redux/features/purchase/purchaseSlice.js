import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    item : []
}
let PurchaseSlice = createSlice({
    name : 'purchaseItem',
    initialState ,
    reducers : {
        ChangeList : (state , action) => {
            state.item = action.payload
        }
    }
})

export default PurchaseSlice.reducer;
export const {ChangeList } = PurchaseSlice.actions;