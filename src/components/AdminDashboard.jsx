/**
 * Colorful Admin Dashboard with icons, gradient cards, badges, and visual charts.
 * Modern flat + gradient theme with sidebar icons.
 */

import React, { useMemo, useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";
import { Home, ShoppingCart, Users, Package, DollarSign } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyABOmg9FZo711ujsPCb7XOupDM4wh-Av9o",
  authDomain: "recent2025-8c891.firebaseapp.com",
  projectId: "recent2025-8c891",
  storageBucket: "recent2025-8c891.firebasestorage.app",
  messagingSenderId: "815105434520",
  appId: "1:815105434520:web:833e4efb0224c9289e81ed"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

export default function AdminDashboard() {
  const [route, setRoute] = useState("dashboard");

  const [products, setProducts] = useState([]);
  const [resellers, setResellers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Products
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      setProducts(productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));

      // Fetch Resellers
      const resellersCollection = collection(db, 'users');
      const q = query(resellersCollection, where('role', '==', 'reseller'));
      const resellersSnapshot = await getDocs(q);
      setResellers(resellersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));

      // Fetch Orders
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      setOrders(ordersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  // --- Products Modal ---
  const [isProductOpen, setProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const openCreateProduct = () => { setEditingProduct(null); setProductOpen(true); };
  const openEditProduct = (p) => { setEditingProduct(p); setProductOpen(true); };

  const upsertProduct = (payload) => {
    if (payload.id) {
      setProducts(prev => prev.map(p => p.id === payload.id ? payload : p));
    } else {
      payload.id = Date.now();
      setProducts(prev => [payload, ...prev]);
    }
    setProductOpen(false);
  };

  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  // --- Reseller Actions ---
  const updateResellerStatus = (id, status) => setResellers(prev => prev.map(r => r.id === id ? { ...r, status } : r));

  // --- Order Actions ---
  const updateOrderStatus = (id, status) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));

  // --- Metrics ---
  const metrics = useMemo(() => ({
    totalProducts: products.length,
    totalResellers: resellers.length,
    pendingResellers: resellers.filter(r => r.resellerApprovalStatus === 'pending').length,
    totalOrders: orders.length,
    totalSales: orders.reduce((acc, order) => acc + order.totalAmount, 0)
  }), [products, resellers, orders]);

  const salesData = [
    { month: "Jan", revenue: 4000, orders: 24 },
    { month: "Feb", revenue: 3200, orders: 19 },
    { month: "Mar", revenue: 5000, orders: 30 },
  ];

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
    { key: 'products', label: 'Products', icon: <ShoppingCart size={18} /> },
    { key: 'resellers', label: 'Resellers', icon: <Users size={18} /> },
    { key: 'orders', label: 'Orders', icon: <Package size={18} /> },
    { key: 'sales', label: 'Sales', icon: <DollarSign size={18} /> },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-72 bg-gray-900 text-white shadow-lg">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-300">Full system control</p>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map(item => (
            <button key={item.key} onClick={() => setRoute(item.key)} className={`w-full flex items-center gap-2 px-3 py-2 rounded ${route===item.key? 'bg-gradient-to-r from-blue-500 to-purple-500 font-semibold':''}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">{route.charAt(0).toUpperCase() + route.slice(1)}</h1>

        {route === 'dashboard' && (
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
              <CardContent><CardTitle>Total Sales</CardTitle><div className="text-2xl font-bold">₹{metrics.totalSales}</div></CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
              <CardContent><CardTitle>Resellers</CardTitle><div className="text-2xl font-bold">{metrics.totalResellers}</div></CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-400 to-orange-600 text-white">
              <CardContent><CardTitle>Pending Approvals</CardTitle><div className="text-2xl font-bold">{metrics.pendingResellers}</div></CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white">
              <CardContent><CardTitle>Recent Orders</CardTitle><div className="text-2xl font-bold">{metrics.totalOrders}</div></CardContent>
            </Card>
          </div>
        )}

        {route === 'products' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Products</h2>
              <Button onClick={openCreateProduct}>Add Product</Button>
            </div>
            <div className="overflow-auto bg-white rounded border">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-left">SKU</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Stock</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{p.name}</td>
                      <td className="px-4 py-2">{p.sku}</td>
                      <td className="px-4 py-2">₹{p.price}</td>
                      <td className="px-4 py-2">{p.stock}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <Button onClick={() => openEditProduct(p)}>Edit</Button>
                        <Button variant="destructive" onClick={() => deleteProduct(p.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Dialog open={isProductOpen} onOpenChange={setProductOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
                </DialogHeader>
                <ProductForm initial={editingProduct} onSave={upsertProduct} onCancel={() => setProductOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        )}

        {route === 'resellers' && (
          <div className="bg-white rounded border overflow-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resellers.map(r => (
                  <tr key={r.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{r.resellerDetails.fullName}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-white text-sm ${r.resellerApprovalStatus==='pending'? 'bg-orange-500': r.resellerApprovalStatus==='approved'? 'bg-green-500':'bg-red-500'}`}>{r.resellerApprovalStatus}</span>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button onClick={() => updateResellerStatus(r.id, 'approved')}>Approve</Button>
                      <Button variant="destructive" onClick={() => updateResellerStatus(r.id, 'rejected')}>Reject</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {route === 'orders' && (
          <div className="bg-white rounded border overflow-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{o.id}</td>
                    <td className="px-4 py-2">{o.customerName}</td>
                    <td className="px-4 py-2 capitalize">{o.paymentStatus}</td>
                    <td className="px-4 py-2 flex gap-2">
                      {o.paymentStatus !== 'shipped' && <Button onClick={() => updateOrderStatus(o.id, 'shipped')}>Ship</Button>}
                      {o.paymentStatus !== 'delivered' && <Button onClick={() => updateOrderStatus(o.id, 'delivered')}>Deliver</Button>}
                      {o.paymentStatus !== 'cancelled' && <Button variant="destructive" onClick={() => updateOrderStatus(o.id, 'cancelled')}>Cancel</Button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {route === 'sales' && (
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#7e22ce" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Orders</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

// --- ProductForm with Checklist & Gradient Progress ---
function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => initial ? { ...initial } : {
    title: "", sku: "", price: 0, stock: 0,
    images: [], weight: "", length: "", breadth: "", height: "",
    attributes: "", variationSkus: "",
    taxClass: "", origin: ""
  });

  const handleFile = (e) => {
    const files = Array.from(e.target.files).map(f => f.name);
    setForm({ ...form, images: files });
  };

  const mandatoryFields = {
    "Product Name": !!form.title,
    "SKU": !!form.sku,
    "Price": !!form.price,
    "Inventory Qty": !!form.stock,
    "Images": form.images.length > 0,
    "Weight": !!form.weight,
    "Length": !!form.length,
    "Breadth": !!form.breadth,
    "Height": !!form.height,
    "Tax Class": !!form.taxClass,
    "Country of Origin": !!form.origin,
  };

  const progress = Math.round((Object.values(mandatoryFields).filter(Boolean).length / Object.keys(mandatoryFields).length) * 100);

  const submit = (e) => {
    e.preventDefault();
    if (progress < 100) return alert('Please fill all mandatory fields');
    onSave({ ...form });
  };

  return (
    <form onSubmit={submit} className="space-y-3 max-h-[70vh] overflow-y-auto">
      {/* form fields same as before */}

      <div className="pt-4">
        <h4 className="font-semibold mb-2">Checklist Progress</h4>
        <Progress value={progress} className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500" />
        <ul className="mt-2 space-y-1 text-sm">
          {Object.entries(mandatoryFields).map(([field, filled]) => (
            <li key={field} className={`flex items-center gap-2 ${filled ? 'text-green-600':'text-red-600'}`}>
              {filled ? <CheckCircle2 /> : <XCircle />} {field}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 justify-end pt-3">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
