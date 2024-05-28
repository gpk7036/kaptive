import "./App.css";
import { CashFlowCharts } from "./components/CashFlowCharts";
import { CashflowSummary } from "./components/CashflowSummary";
import SimpleSidebar from "./components/Sidebar";
import data from "../db.json";
import { useEffect, useState } from "react";

function App() {

  return (
    <>
      <SimpleSidebar>
        <CashFlowCharts data={data.Sheet1} />
        <CashflowSummary data={data.Sheet1} />
      </SimpleSidebar>
    </>
  );
}

export default App;
