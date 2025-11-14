const API_ROOT = 'http://localhost:4000';

function getClientId() {
  let id = localStorage.getItem('client_id');
  if (!id) {
    id = String(Date.now());
    localStorage.setItem('client_id', id);
  }
  return id;
}

export async function addToCart(productId: any, quantity = 1) {
  const client_id = getClientId();
  const res = await fetch(`${API_ROOT}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id, product_id: productId, quantity })
  });
  if (!res.ok) {
    let body = 'Failed to add to cart';
    try {
      const j = await res.json();
      body = j.error || j.message || JSON.stringify(j);
    } catch (e) {}
    throw new Error(body);
  }
  return res.json();
}

export async function getCart() {
  const client_id = getClientId();
  const res = await fetch(`${API_ROOT}/api/cart/${client_id}`);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
}

export async function removeCartItem(id: number | string) {
  const res = await fetch(`${API_ROOT}/api/cart/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete cart item');
  return res.json();
}
