import React, { useState, useEffect } from 'react';

const TopResellersTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/top-resellers');
        const topResellers = await response.json();
        setData(topResellers);
      } catch (error) {
        console.error('Error fetching top resellers data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2">Reseller Name</th>
            <th className="px-4 py-2">Total Sales</th>
            <th className="px-4 py-2">Order Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map(reseller => (
            <tr key={reseller.id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{reseller.name}</td>
              <td className="px-4 py-2">${reseller.totalSales.toFixed(2)}</td>
              <td className="px-4 py-2">{reseller.orderCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopResellersTable;
