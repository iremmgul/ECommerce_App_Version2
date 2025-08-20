import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartVersion: 0,
  incrementCartVersion: () =>
    set((state) => ({ cartVersion: state.cartVersion + 1 })),
}));

export default useCartStore;
