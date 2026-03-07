import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../types/cart.types';

interface CartState {
  readonly items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'selected'>>) {
      const exists = state.items.some(
        (item) => item.bookId === action.payload.bookId
      );
      if (exists === false) {
        state.items.push({ ...action.payload, selected: false });
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.bookId !== action.payload
      );
    },

    toggleSelectItem(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.bookId === action.payload);
      if (item) {
        item.selected = !item.selected;
      }
    },

    toggleSelectAll(state) {
      const allSelected = state.items.every((item) => item.selected);
      state.items.forEach((item) => {
        item.selected = !allSelected;
      });
    },

    removeSelectedItems(state) {
      state.items = state.items.filter((item) => item.selected === false);
    },

    clearCart(state) {
      state.items = [];
    },
  },
  selectors: {
    selectCartItems: (state) => state.items,
    selectCartCount: (state) => state.items.length,
    selectSelectedItems: (state) => state.items.filter((item) => item.selected),
    selectSelectedCount: (state) =>
      state.items.filter((item) => item.selected).length,
    selectIsAllSelected: (state) =>
      state.items.length > 0 && state.items.every((item) => item.selected),
  },
});

export const {
  addToCart,
  removeFromCart,
  toggleSelectItem,
  toggleSelectAll,
  removeSelectedItems,
  clearCart,
} = cartSlice.actions;

export const {
  selectCartItems,
  selectCartCount,
  selectSelectedItems,
  selectSelectedCount,
  selectIsAllSelected,
} = cartSlice.selectors;
