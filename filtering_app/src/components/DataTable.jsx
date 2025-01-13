import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startYear: '',
    endYear: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: ''
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchData();
  }, [filters, sortBy, sortOrder]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/income-statements', {
        params: {
          start_year: filters.startYear,
          end_year: filters.endYear,
          min_revenue: filters.minRevenue,
          max_revenue: filters.maxRevenue,
          min_net_income: filters.minNetIncome,
          max_net_income: filters.maxNetIncome,
          sort_by: sortBy,
          order: sortOrder,
        }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  // handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // handle sort changes
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Income Statement Data</h1>

      {/* filter inputs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          name="startYear"
          value={filters.startYear}
          onChange={handleFilterChange}
          placeholder="Start Year"
          className="border p-2"
        />
        <input
          type="number"
          name="endYear"
          value={filters.endYear}
          onChange={handleFilterChange}
          placeholder="End Year"
          className="border p-2"
        />
        <input
          type="number"
          name="minRevenue"
          value={filters.minRevenue}
          onChange={handleFilterChange}
          placeholder="Min Revenue"
          className="border p-2"
        />
        <input
          type="number"
          name="maxRevenue"
          value={filters.maxRevenue}
          onChange={handleFilterChange}
          placeholder="Max Revenue"
          className="border p-2"
        />
        <input
          type="number"
          name="minNetIncome"
          value={filters.minNetIncome}
          onChange={handleFilterChange}
          placeholder="Min Net Income"
          className="border p-2"
        />
        <input
          type="number"
          name="maxNetIncome"
          value={filters.maxNetIncome}
          onChange={handleFilterChange}
          placeholder="Max Net Income"
          className="border p-2"
        />
      </div>

      {/* sort options */}
      <div className="mb-4">
        <label className="mr-4">Sort by:</label>
        <select onChange={handleSortChange} className="border p-2">
          <option value="date">Date</option>
          <option value="revenue">Revenue</option>
          <option value="netIncome">Net Income</option>
        </select>
        <button onClick={toggleSortOrder} className="ml-4 bg-blue-500 text-white px-4 py-2">
          Toggle {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
      </div>

      {/* data table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Revenue</th>
              <th className="py-2">Net Income</th>
              <th className="py-2">Gross Profit</th>
              <th className="py-2">EPS</th>
              <th className="py-2">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.date}>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.revenue}</td>
                <td className="border px-4 py-2">{item.netIncome}</td>
                <td className="border px-4 py-2">{item.grossProfit}</td>
                <td className="border px-4 py-2">{item.eps}</td>
                <td className="border px-4 py-2">{item.operatingIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;