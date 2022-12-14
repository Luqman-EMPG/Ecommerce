import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cart = createSlice({

    name: "cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            const exist = state.findIndex(element => element.id === action.payload.id)
            if(exist !== -1){
                state[exist] = {...state[exist], qty: state[exist].qty + 1}
            }
            else{
                state.push({id:action.payload.id, qty: 1})
            }
        },
        // AddToCart: (state, action) => {
        //
        //     console.log("action payload", action.payload);
        //     const exist = state.findIndex(element => element.id === action.payload.id)
        //     if(exist !== -1){
        //         state[exist] = {...state[exist], qty: state[exist].qty + 1, userId: action?.payload?.userId}
        //         console.log(action?.payload?.userId,"UserID")
        //     }
        //     else{
        //         state.push({id:action.payload.id, qty: 1,userId: action?.payload?.userId})
        //     }
        // },
        DecreaseInCart: (state, action)=>{

            const exist = state.findIndex(element => element.id === action.payload.id)

            if(state[exist].qty === 0){
                alert("Add at least 1 quantity in cart")
                state[exist] = {...state[exist], qty: state[exist].qty + 0}
            }
            else if(exist !== -1){
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
