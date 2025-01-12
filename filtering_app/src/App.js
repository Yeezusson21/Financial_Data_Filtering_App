import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  });

  // Fetch data from the external API
  useEffect(() => {
    fetch('https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=aV5bGA6mpU270lg6UvuX8FLDak4BhElS')
      .then((response) => response.json())
      .then((data) => {
        // Flatten the data as it's in an array format
        const formattedData = data.map((item) => ({
          date: item.date,
          revenue: item.revenue,
          netIncome: item.netIncome,
          grossProfit: item.grossProfit,
          eps: item.eps,
          operatingIncome: item.operatingIncome,
        }));
        setData(formattedData);
        setFilteredData(formattedData); // Set the initial state of filtered data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle input changes for filters
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Apply filtering based on user inputs
  const applyFilters = () => {
    const filtered = data.filter((item) => {
      const withinDateRange = (!filters.startDate || new Date(item.date) >= new Date(filters.startDate)) &&
                              (!filters.endDate || new Date(item.date) <= new Date(filters.endDate));

      const withinRevenueRange = (!filters.minRevenue || item.revenue >= Number(filters.minRevenue)) &&
                                 (!filters.maxRevenue || item.revenue <= Number(filters.maxRevenue));

      const withinNetIncomeRange = (!filters.minNetIncome || item.netIncome >= Number(filters.minNetIncome)) &&
                                   (!filters.maxNetIncome || item.netIncome <= Number(filters.maxNetIncome));

      return withinDateRange && withinRevenueRange && withinNetIncomeRange;
    });
    setFilteredData(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Data</h1>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block font-semibold">Start Date:</label>
          <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange}
            className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-semibold">End Date:</label>
          <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange}
            className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-semibold">Min Revenue:</label>
          <input type="number" name="minRevenue" value={filters.minRevenue} onChange={handleFilterChange}
            className="w-full p-2 border rounded" placeholder="Enter min revenue" />
        </div>

        <div>
          <label className="block font-semibold">Max Revenue:</label>
          <input type="number" name="maxRevenue" value={filters.maxRevenue} onChange={handleFilterChange}
            className="w-full p-2 border rounded" placeholder="Enter max revenue" />
        </div>

        <div>
          <label className="block font-semibold">Min Net Income:</label>
          <input type="number" name="minNetIncome" value={filters.minNetIncome} onChange={handleFilterChange}
            className="w-full p-2 border rounded" placeholder="Enter min net income" />
        </div>

        <div>
          <label className="block font-semibold">Max Net Income:</label>
          <input type="number" name="maxNetIncome" value={filters.maxNetIncome} onChange={handleFilterChange}
            className="w-full p-2 border rounded" placeholder="Enter max net income" />
        </div>
      </div>

      <button onClick={applyFilters} className="px-4 py-2 bg-blue-600 text-white rounded">Apply Filters</button>

      {/* Data Table */}
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Revenue</th>
            <th className="px-4 py-2">Net Income</th>
            <th className="px-4 py-2">Gross Profit</th>
            <th className="px-4 py-2">EPS</th>
            <th className="px-4 py-2">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">No data available</td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">${item.revenue.toLocaleString()}</td>
                <td className="px-4 py-2">${item.netIncome.toLocaleString()}</td>
                <td className="px-4 py-2">${item.grossProfit.toLocaleString()}</td>
                <td className="px-4 py-2">{item.eps}</td>
                <td className="px-4 py-2">${item.operatingIncome.toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;