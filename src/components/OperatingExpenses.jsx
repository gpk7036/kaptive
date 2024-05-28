import { Box, Heading, Text } from "@chakra-ui/react";
import { useMemo } from "react";
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

const OperatingExpenses = [
  [
    "R&D - Research",
    "R&D - Development",
    "Insurance",
    "Adwords",
    "Patents",
    "Seminars",
    "Licenses",
    "Royalties",
  ],
  [
    "Payroll",
    "Salaries",
    "Wages",
    "Bonus",
    "Payroll Taxes",
    "Employee Benefits",
    "Medical",
    "Dental",
    "Health Insurance",
    "Worker Compensation",
    "Payroll Processing",
    "Meals & Entertainment",
    "Hiring",
    "Employee Related",
    "Training",
    "Education",
  ],
  [
    "Professional Services",
    "Accounting Services",
    "HR Services",
    "Audit & Tax Services",
    "Consultant Services",
    "Legal Services",
    "Other Opex",
    "D&A - Opex",
    "Depreciation - Opex",
    "Amortization - Opex",
  ],
  [
    "Office & Admin.",
    "Bank Charges",
    "IT Expenses",
    "License & Permits",
    "Membership Expenses",
    "Subscription Expenses",
    "Network & Hosting",
    "Penalties & Charges",
    "Postage & Shipping",
    "Printing & Stationery",
    "Repairs & Maintenance",
    "Waste Disposal",
    "Rentals",
    "Equipment Expenses",
    "Facilities Expenses",
    "General Expenses",
    "Administrative Expenses",
  ],
];

const OperatingExpenseGroups = ["Group 1", "Group 2", "Group 3", "Group 4"];
const colorPalette = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c", "#8dd1e1"];

export const OperatingExpensesChart = ({ data = [] }) => {
  const getMonthlyData = (data) => {
    const months = [
      "Jan", "Feb", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const monthlyData = months.map((month) => {
      const monthData = { month };

      OperatingExpenses.forEach((group, index) => {
        const groupName = OperatingExpenseGroups[index];
        let groupTotal = 0;

        group.forEach((expense) => {
          data.forEach((row) => {
            if (row.Overhead.trim() === expense) {
              groupTotal += row[month];
            }
          });
        });

        monthData[groupName] = groupTotal.toFixed(2);
      });

      let totalExpenses = 0;
      data.forEach((row) => {
        if (row.Overhead.trim() === "Total Expenses") {
          totalExpenses += row[month];
        }
      });

      let netOperatingIncome = 0;
      data.forEach((row) => {
        if (row.Overhead.trim() === "Net Operating Income") {
          netOperatingIncome += row[month];
        }
      });

      monthData["Total Expenses"] = totalExpenses.toFixed(2);
      monthData["Net Operating Income"] = netOperatingIncome.toFixed(2);

      return monthData;
    });

    return monthlyData;
  };

  const filteredData = useMemo(() => getMonthlyData(data), [data]);

  return (
    <Box mt={10} p={4} borderWidth="1px" borderRadius="md" width="100%" overflowX="auto">
      <Box justify="center" mb={4}>
        {OperatingExpenses.map((group, index) => (
          <Box key={index} mx={4}>
            <Text fontWeight="bold">Group {index + 1}</Text>
            {group.map((expense, expenseIndex) => (
              <span key={expenseIndex} style={{ marginRight: '5px' }}>{expense} |</span>
            ))}
          </Box>
        ))}
      </Box>
      <Box width={{ base: "700px", md: "100%" }}>
        <Heading size="md" mb={4}>
          Operating Expenses
        </Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData} margin={{ top: 10, right: 10, left: 50, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {OperatingExpenseGroups.map((_, index) => (
              <Bar
                key={index}
                dataKey={`Group ${index + 1}`}
                fill={colorPalette[index % colorPalette.length]}
                barSize={20}
              />
            ))}
            <Bar
              dataKey="Total Expenses"
              fill={colorPalette[OperatingExpenseGroups.length % colorPalette.length]}
              barSize={20}
            />
            <Bar
              dataKey="Net Operating Income"
              fill={colorPalette[(OperatingExpenseGroups.length + 1) % colorPalette.length]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
