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

  // fetch data from the API
  useEffect(() => {
    fetch('https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=aV5bGA6mpU270lg6UvuX8FLDak4BhElS')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          date: item.date,
          revenue: item.revenue,
          netIncome: item.netIncome,
          grossProfit: item.grossProfit,
          eps: item.eps,
          operatingIncome: item.operatingIncome,
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // handle input changes for filters
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // apply filtering based on user inputs
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
      <h1 className="text-3xl font-bold mb-6 text-center">Financial Data Viewer</h1>

      {/* filter Section */}
      <div className="space-y-4 mb-6">
        {/* row 1: start date and end date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Start Date:</label>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">End Date:</label>
            <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded" />
          </div>
        </div>

        {/* row 2: min and max revenue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Min Revenue:</label>
            <input type="number" name="minRevenue" value={filters.minRevenue} onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded" placeholder="Enter min revenue" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Max Revenue:</label>
            <input type="number" name="maxRevenue" value={filters.maxRevenue} onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded" placeholder="Enter max revenue" />
          </div>
        </div>

        {/* row 3: min and max net income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Min Net Income:</label>
            <input type="number" name="minNetIncome" value={filters.minNetIncome} onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded" placeholder="Enter min net income" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Max Net Income:</label>
            <input type="number" name="maxNetIncome" value={filters.maxNetIncome} onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded" placeholder="Enter max net income" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={applyFilters} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Apply Filters</button>
      </div>

      {/* data table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Revenue</th>
              <th className="border border-gray-300 px-4 py-2">Net Income</th>
              <th className="border border-gray-300 px-4 py-2">Gross Profit</th>
              <th className="border border-gray-300 px-4 py-2">EPS</th>
              <th className="border border-gray-300 px-4 py-2">Operating Income</th>
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
                  <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.revenue.toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.netIncome.toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.grossProfit.toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.eps}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.operatingIncome.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;