import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./App.css";

const queries = [
  { id: 1, query: "SELECT * FROM orders WHERE freight > 50" },
  {
    id: 2,
    query: "SELECT customerID, COUNT(*) FROM orders GROUP BY customerID",
  },
  {
    id: 3,
    query:
      'SELECT orderID, orderDate, shipCountry FROM orders WHERE shipCountry = "France"',
  },
  {
    id: 4,
    query: "SELECT productID, SUM(quantity) FROM orders GROUP BY productID",
  },
  {
    id: 5,
    query: "SELECT shipCountry, AVG(freight) FROM orders GROUP BY shipCountry",
  },
  { id: 6, query: "SELECT orderDate, COUNT(*) FROM orders GROUP BY orderDate" },
  {
    id: 7,
    query:
      "SELECT orderID, (unitPrice * quantity * (1 - discount)) AS TotalPrice FROM orders",
  },
  {
    id: 8,
    query: "SELECT customerID, MAX(freight) FROM orders GROUP BY customerID",
  },
  {
    id: 9,
    query:
      "SELECT productID, COUNT(*) FROM orders WHERE quantity > 10 GROUP BY productID",
  },
  {
    id: 10,
    query:
      'SELECT orderID, customerID, shipCountry FROM orders WHERE shipCountry != "USA"',
  },
];

function App() {
  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [inputQuery, setInputQuery] = useState(selectedQuery.query);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("/orders.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setData(result.data);
            applyQuery(result.data, selectedQuery);
          },
        });
      });
  }, [selectedQuery]);

  const handleQueryChange = (e) => {
    const selected = queries.find((q) => q.id === Number(e.target.value));
    setSelectedQuery(selected);
    setInputQuery(selected.query);
    applyQuery(data, selected);
  };

  const applyQuery = (data, query) => {
    if (query.id === 1) {
      setFilteredData(data.filter((order) => order.freight > 50));
    } else if (query.id === 2) {
      const groupedData = Array.from(
        new Set(data.map((order) => order.customerID))
      ).map((id) => ({
        customerID: id,
        count: data.filter((order) => order.customerID === id).length,
      }));
      setFilteredData(groupedData);
    } else if (query.id === 3) {
      setFilteredData(data.filter((order) => order.shipCountry === "France"));
    } else {
      setFilteredData(data); // Display full data for other queries
    }
  };

  return (
    <div className="app">
      <h1>SQL Query Simulator</h1>
      <select
        onChange={handleQueryChange}
        value={selectedQuery.id}
        className="query-select"
      >
        {queries.map((q) => (
          <option key={q.id} value={q.id}>
            {q.query}
          </option>
        ))}
      </select>
      <textarea
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        className="query-textarea"
      />
      <h2>Results:</h2>
      <div className="table-container">
        <table className="query-table">
          <thead>
            <tr>
              {filteredData.length > 0 &&
                Object.keys(filteredData[0]).map((key) => (
                  <th
                    key={key}
                    style={{ backgroundColor: "#ADBABD", color: "#333" }}
                  >
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td
                    key={i}
                    style={{ backgroundColor: "#fff", color: "#333" }}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
