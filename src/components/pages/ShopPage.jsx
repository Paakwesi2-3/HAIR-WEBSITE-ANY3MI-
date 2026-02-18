import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { useState } from 'react';

export default function ShopPage() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const wigs = [
    { id: 1, name: 'Brazilian Body Wave Wig', price: 155, image: 'https://images.unsplash.com/photo-1747979022469-43e0f3d7641f?ixlib=rb-4.1.0&q=80&w=1080', inStock: true, description: '100% virgin human hair with natural body wave pattern' },
    { id: 2, name: 'Curly Lace Front Wig', price: 145, image: 'https://images.unsplash.com/photo-1664099160144-f6991681878d?ixlib=rb-4.1.0&q=80&w=1080', inStock: true, description: 'Beautiful curly texture with HD lace for natural hairline' },
    { id: 3, name: 'Straight Lace Front Wig', price: 135, image: 'https://images.unsplash.com/photo-1747979022469-43e0f3d7641f?ixlib=rb-4.1.0&q=80&w=1080', inStock: true, description: 'Sleek straight hair, perfect for a polished look' },
    { id: 4, name: 'Deep Wave Wig', price: 150, image: 'https://images.unsplash.com/photo-1664099160144-f6991681878d?ixlib=rb-4.1.0&q=80&w=1080', inStock: false, description: 'Deep wave pattern for volume and texture' }
  ];

  const braidingHair = [
    { id: 7, name: 'Kanekalon Braiding Hair - Black', price: 8, image: 'https://images.unsplash.com/photo-1600879368265-74ef8b9d2735?ixlib=rb-4.1.0&q=80&w=1080', inStock: true, description: 'High-quality synthetic hair, perfect for box braids' },
    { id: 8, name: 'Pre-Stretched Braiding Hair', price: 10, image: 'https://images.unsplash.com/photo-1600879368265-74ef8b9d2735?ixlib=rb-4.1.0&q=80&w=1080', inStock: true, description: 'Saves time - already stretched and ready to use' },
    { id: 9, name: 'Ombre Braiding Hair', price: 12, image: 'https://images.unsplash.com/photo-1600879368265-74ef8b9d2735?ixlib=rb-4.1.0&q=80&w=1080', inStock: true, description: 'Two-tone colors for a trendy gradient look' },
    { id: 10, name: 'Jumbo Braiding Hair', price: 7, image: 'https://images.unsplash.com/photo-1600879368265-74ef8b9d2735?ixlib=rb-4.1.0&q=80&w=1080', inStock: true, description: 'Extra volume for thick, bold braids' }
  ];

  const addToCart = (product) => setCart((s) => [...s, product]);
  const removeFromCart = (index) => setCart((s) => s.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);
  const total = cart.reduce((sum, p) => sum + (p.price || 0), 0);

  const ProductCard = ({ product }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 transform hover:scale-105" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-white">{product.name}</h3>
          {product.inStock ? (
            <Badge className="bg-green-100 text-green-800">In Stock</Badge>
          ) : (
            <Badge variant="secondary">Out of Stock</Badge>
          )}
        </div>
        <p className="text-gray-300 text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-pink-300">£{product.price}</span>
          <Button onClick={() => addToCart(product)} disabled={!product.inStock} className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">
            <ShoppingCart className="w-4 h-4 mr-2" />Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div>
      <section className="bg-gradient-to-r from-pink-500 to-blue-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop Wigs & Hair Products</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Premium quality wigs and braiding hair for all your styling needs</p>
          {cart.length > 0 && (
            <div className="mt-6 inline-flex items-center bg-neutral-800 text-pink-300 px-6 py-3 rounded-full font-semibold">
              <ShoppingCart className="w-5 h-5 mr-2" />{cart.length} item(s) in cart
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-neutral-900/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Products</h2>
            <div className="flex items-center gap-3">
              <Button onClick={() => setShowCart((s) => !s)} className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" /> View Cart ({cart.length})
              </Button>
            </div>
          </div>

          <Tabs defaultValue="wigs" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="wigs">Wigs</TabsTrigger>
              <TabsTrigger value="braiding">Braiding Hair</TabsTrigger>
            </TabsList>

            <TabsContent value="wigs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wigs.map((w) => (
                  <ProductCard key={w.id} product={w} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="braiding">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {braidingHair.map((b) => (
                  <ProductCard key={b.id} product={b} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {showCart && (
            <div className="mt-8 border rounded-lg p-4 bg-neutral-800 text-gray-200">
              <h3 className="text-lg font-semibold mb-4">Your Cart</h3>
              {cart.length === 0 ? (
                <Alert>
                  <AlertDescription>Your cart is empty.</AlertDescription>
                </Alert>
              ) : (
                <div>
                  <div className="space-y-3">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-16 h-12 object-cover rounded transition-transform duration-200 transform hover:scale-110" />
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-300">£{item.price}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => removeFromCart(idx)} className="text-sm text-red-600">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-semibold">Total:</div>
                    <div className="text-xl font-bold">£{total}</div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button onClick={() => { /* placeholder checkout */ }} className="bg-pink-600 text-white">Checkout</Button>
                    <Button onClick={clearCart} variant="outline">Clear Cart</Button>
                    <Button onClick={() => setShowCart(false)} variant="ghost">Close</Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
