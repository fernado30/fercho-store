import React, { useMemo } from 'react';
import { useStore } from '../stores/useStore';
import Cart from '../components/Cart';
import { createOrder } from '../services/ordersService';
import { generateWhatsAppUrl } from '../utils/whatsapp';

export default function CartPage() {
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const clearCart = useStore((s) => s.clearCart);

  const total = useMemo(() => cart.reduce((sum, p) => sum + p.price * p.qty, 0), [cart]);

  const handleCheckout = async () => {
    try {
      const order = {
        items: cart,
        total,
        createdAt: new Date().toISOString()
      };
      const orderId = await createOrder(order);
      const text = `Hola, quiero comprar (orden ${orderId}). Total: $${total.toFixed(2)}.`;
      const wa = generateWhatsAppUrl('3228110568', text);
      clearCart();
      window.open(wa, '_blank');
    } catch (err) {
      console.error('Checkout error', err);
    }
  };

  return (
    <div>
      <h2>Carrito</h2>
      <Cart cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} />
      <hr />
      <h4>Total: ${total.toFixed(2)}</h4>
      <button className="btn btn-success" onClick={handleCheckout} disabled={cart.length === 0}>Comprar por WhatsApp</button>
    </div>
  );
}
