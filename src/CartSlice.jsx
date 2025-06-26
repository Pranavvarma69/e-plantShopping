import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const newitem=action.payload
        const existingitem=state.items.find(item=>item.name===newitem.name)
        if(existingitem){
            existingitem.quantity+=1
        }
        else{
            state.items.push({...newitem,quantity:1})
        }
    
    },
    removeItem: (state, action) => {
        const nametoremove=action.payload;
        state.items.filter(item=>item.name!==nametoremove)
    },
    updateQuantity: (state, action) => {
        const{name,quantity}=action.payload
        const itemtoupdate=state.items.find(item=>item.name===name)
        if(itemtoupdate){
            itemtoupdate.quantity=quantity
        }

    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
