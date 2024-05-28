import { Box, Button, Flex, Heading, Select } from "@chakra-ui/react";
import { useMemo, useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Assets } from "./Assets";
import { OperatingExpensesChart } from "./OperatingExpenses";

const CashFlowCharts = ({ data = [] }) => {
  const [currentChart, setCurrentChart] = useState("cashFlow");

  const getMonthlyData = (data) => {
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthlyData = months.map((month) => {
      let sales = 0;
      let cogs = 0;
      let grossProfit = 0;

      data.forEach((row) => {
        if (
          [
            "Sales - Products",
            "Sales - Services",
            "Sales - Other",
            "Sales - Deductions",
          ].includes(row.Overhead)
        ) {
          sales += row[month];
        } else if (
          [
            "COGS - Labour",
            "COGS - Raw Material",
            "COGS - Freight",
            "COGS - Overheads",
            "COGS - Other",
          ].includes(row.Overhead)
        ) {
          cogs += row[month];
        } else if (row.Overhead === "Gross Profit") {
          grossProfit += row[month];
        }
      });

      return {
        month,
        sales: sales.toFixed(2),
        cogs: cogs.toFixed(2),
        grossProfit: grossProfit.toFixed(2),
      };
    });

    return monthlyData;
  };

  const filteredData = useMemo(() => getMonthlyData(data), [data]);

  return (
    <Box
      id="cashFlowChart"
      bgColor={"white"}
      m={{ sm: 2, md: 3, lg: 5 }}
      p={{ sm: 2, md: 3, lg: 5 }}
      borderRadius={5}
    >
      <Flex wrap={"wrap"} justify={"space-between"}>
        <Flex gap={2} wrap={"wrap"}>
          <Button onClick={() => setCurrentChart("cashFlow")}>Summary</Button>
          <Button onClick={() => setCurrentChart("assets")}>Assets</Button>
          <Button onClick={() => setCurrentChart("expenses")}>
            Operating Expenses
          </Button>
        </Flex>
      </Flex>
      {currentChart === "cashFlow" ? (
        <Box
          mt={10}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          width="100%"
          overflowX="auto"
        >
          <Box width={{ base: "700px", md: "100%" }}>
            <Heading size="md" mb={4}>
              Sales, COGS, and Gross Profit by Month
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={filteredData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 50,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#b888dc" name="Sales" />
                <Bar dataKey="cogs" fill="#01b1f2" name="COGS" />
                <Bar dataKey="grossProfit" fill="#ee7d34" name="Gross Profit" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      ) : currentChart === "assets" ? (
        <Assets data={data} />
      ) : (
        <OperatingExpensesChart data={data} />
      )}
    </Box>
  );
};

export { CashFlowCharts };
