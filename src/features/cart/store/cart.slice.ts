import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

interface CartState {
  readonly selectedItemIds: number[];
}

const initialState: CartState = {
  selectedItemIds: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleSelectItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      const currentSelections = state.selectedItemIds || [];
      if (currentSelections.includes(id)) {
        state.selectedItemIds = currentSelections.filter((item) => item !== id);
      } else {
        state.selectedItemIds = [...currentSelections, id];
      }
    },

    toggleSelectAll(state, action: PayloadAction<number[]>) {
      // action.payload contains all currently visible bookIds in the cart
      // if all visible items are already selected, clear them
      // else, select all of them
      const currentSelections = state.selectedItemIds || [];
      const allSelected =
        action.payload.length > 0 &&
        action.payload.every((id) => currentSelections.includes(id));

      if (allSelected) {
        state.selectedItemIds = [];
      } else {
        // Use Set to ensure uniqueness when merging, just in case
        state.selectedItemIds = Array.from(new Set(action.payload));
      }
    },

    clearCartSelections(state) {
      state.selectedItemIds = [];
    },

    setSelections(state, action: PayloadAction<number[]>) {
      state.selectedItemIds = action.payload;
    },

    // Sync selections to ensure removed items are no longer selected locally
    syncSelections(state, action: PayloadAction<number[]>) {
      const currentIds = new Set(action.payload);
      const currentSelections = state.selectedItemIds || [];
      state.selectedItemIds = currentSelections.filter((id) =>
        currentIds.has(id)
      );
    },
  },
});

export const {
  toggleSelectItem,
  toggleSelectAll,
  clearCartSelections,
  setSelections,
  syncSelections,
} = cartSlice.actions;

export const selectSelectedIds = (state: RootState) =>
  state.cart?.selectedItemIds || [];
