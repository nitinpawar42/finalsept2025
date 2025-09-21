import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/client';

const TopCustomersTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();

        const response = await fetch('/api/reseller/top-customers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const topCustomers = await response.json();
          setData(topCustomers);
        } else {
          console.error('Failed to fetch top customers data');
        }

      } catch (error) {
        console.error('Error fetching top customers data:', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchData();
      }
    });

    return () => unsubscribe();

  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Total Sales</th>
            <th className="px-4 py-2">Order Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map(customer => (
            <tr key={customer.id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{customer.name}</td>
              <td className="px-4 py-2">${customer.totalSales.toFixed(2)}</td>
              <td className="px-4 py-2">{customer.orderCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCustomersTable;
