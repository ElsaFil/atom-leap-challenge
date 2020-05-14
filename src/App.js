import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import axios from "axios";

function App() {
  const [rawData, setRawData] = useState(null);
  const [dataByCategory, setDataByCategory] = useState(null);
  const [fundingByCategory, setFundingByCategory] = useState(null);
  const [roundsByCategory, setRoundsByCategory] = useState(null);

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

    let categoriesFunding = {};
    let categoriesRounds = {};
    for (let category in dataByCategory) {
      let fundingTotal = dataByCategory[category].reduce((acc, obj) => {
        return acc + obj.fundingAmount;
      }, 0);
      categoriesFunding[category] = fundingTotal;

      let rounds = dataByCategory[category].length;
      categoriesRounds[category] = rounds;
    }
    setFundingByCategory(categoriesFunding);
    setRoundsByCategory(categoriesRounds);
  }, [dataByCategory]);

  return <div className="App"></div>;
}

export default App;
