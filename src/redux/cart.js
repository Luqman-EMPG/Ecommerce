import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            console.log(action)
            const exist = state.findIndex(element => element.id === action.payload.id)
            if(exist > -1){
                state[exist] = {...state[exist], qty: state[exist].qty + 1}
            }
            else{
                state.push({id:action.payload.id, qty: 1})
            }
        },
        DecreaseInCart: (state, action)=>{
            const exist = state.findIndex(element => element.id === action.payload.id)
            if(exist > -1){
                state[exist] = {...state[exist], qty: state[exist].qty - 1}
            }
            else{
                state.pop({id:action.payload.id, qty: 1})
            }

        },
        ResetCart: ()=> initialState,

    }
})

export const {AddToCart,ResetCart,DecreaseInCart} = cart.actions

export default cart.reducer;
