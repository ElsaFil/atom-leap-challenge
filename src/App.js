import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import axios from "axios";
import GraphContainer from "./components/GraphContainer";
import TableContainer from "./components/TableContainer";

export default function App() {
  const [rawData, setRawData] = useState(null);
  const [dataByCategory, setDataByCategory] = useState(null);
  const [aggregatedDataByCategory, setAggregatedDataByCategory] = useState(
    null
  );
  const [selectedDataType, setSelectedDataType] = useState("volumes");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("http://demo0377384.mockable.io/funding-test")
      .then((response) => {
        setRawData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // parses the raw data, whenever it changes
    if (!rawData) {
      return;
    }
    let categories = {};
    rawData.forEach((obj) => {
      if (!categories[obj.category]) {
        categories[obj.category] = [];
      }
      categories[obj.category].push(obj);
    });

    setDataByCategory(categories);
  }, [rawData]);

  useEffect(() => {
    if (!dataByCategory) {
      return;
    }

    let aggregatedData = [];
    for (let category in dataByCategory) {
      let fundingTotal = dataByCategory[category].reduce((acc, obj) => {
        return acc + obj.fundingAmount;
      }, 0);

      let rounds = dataByCategory[category].length;

      aggregatedData.push({
        category: category,
        funding: fundingTotal / 1000000,
        rounds: rounds,
      });
    }
    setAggregatedDataByCategory(aggregatedData);
  }, [dataByCategory]);

  function toggleTableCategory(category) {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(category);
  }

  return (
    <div className="App">
      <h1>Funding By Industry - Analytics</h1>
      <label htmlFor="dataType">Data: </label>

      <select
        id="dataType"
        data-testid="selectDataType"
        onChange={(event) => {
          toggleTableCategory(null);
          setSelectedDataType(event.target.value);
        }}
      >
        <option value="volumes">Funding amount</option>
        <option value="rounds">Funding rounds</option>
      </select>
      <GraphContainer
        selectedDataType={selectedDataType}
        data={{
          dataByCategory: dataByCategory,
          aggregatedDataByCategory: aggregatedDataByCategory,
        }}
        toggleTableCategory={toggleTableCategory}
      />

      {selectedCategory && (
        <TableContainer data={dataByCategory[selectedCategory]} />
      )}
    </div>
  );
}
