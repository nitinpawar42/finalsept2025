
export const resellers = [
  {
    id: "gadget-go",
    name: 'GadgetGo',
    email: 'contact@gadgetgo.com',
    products: [101, 102, 103],
  },
  {
    id: "fashion-forward",
    name: 'FashionForward',
    email: 'support@fashionforward.com',
    products: [201, 202],
  },
];

export const products = [
  {
    id: 101,
    resellerId: "gadget-go",
    name: 'Smart Watch',
    price: 199.99,
    stock: 50,
  },
  {
    id: 102,
    resellerId: "gadget-go",
    name: 'Wireless Earbuds',
    price: 89.99,
    stock: 120,
  },
  {
    id: 103,
    resellerId: "gadget-go",
    name: 'Portable Charger',
    price: 45.50,
    stock: 75,
  },
  {
    id: 201,
    resellerId: "fashion-forward",
    name: 'Classic Leather Jacket',
    price: 250.00,
    stock: 30,
  },
  {
    id: 202,
    resellerId: "fashion-forward",
    name: 'Designer Sunglasses',
    price: 150.75,
    stock: 60,
  },
];
