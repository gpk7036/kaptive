import "./App.css";
import { CashFlowCharts } from "./components/CashFlowCharts";
import { CashflowSummary } from "./components/CashflowSummary";
import SimpleSidebar from "./components/Sidebar";
import Data from "../db.json";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("../db.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setData(data.Sheet1))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <SimpleSidebar>
        <CashFlowCharts data={data} />
        <CashflowSummary data={data} />
      </SimpleSidebar>
    </>
  );
}

export default App;
