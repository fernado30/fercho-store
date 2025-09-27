import { create } from 'zustand';

export const useStore = create((set, get) => ({
  user: null,
  setUser: (u) => set({ user: u }),

  cart: [],
  addToCart: (product, qty = 1) => {
    const cart = [...get().cart];
    const idx = cart.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      cart[idx].qty += qty;
    } else {
      cart.push({ ...product, qty });
    }
    set({ cart });
  },
  updateQty: (productId, qty) => {
    const cart = get().cart.map((p) => (p.id === productId ? { ...p, qty } : p));
    set({ cart });
  },
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((p) => p.id !== productId) });
  },
  clearCart: () => set({ cart: [] })
}));
