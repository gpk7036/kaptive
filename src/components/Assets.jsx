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

const FixedAssets = [
  "PP&E",
  "Land",
  "Machinery",
  "A/D - Machinery",
  "Vehicles",
  "A/D - Vehicles",
  "Computers",
  "A/D - Computers",
  "Furniture & Fixtures",
  "A/D - Furniture & Fixtures",
  "Equipment",
  "A/D - Equipment",
  "Other Fixed Assets",
  "A/D - Other Fixed Assets",
  "Intangible Assets",
  "A/D - Intangible Assets",
  "Total Fixed Assets",
];

const AssetGroups = [
  ["PP&E", "Land", "Machinery", "A/D - Machinery", "Vehicles", "A/D - Vehicles"],
  ["Computers", "A/D - Computers", "Furniture & Fixtures", "A/D - Furniture & Fixtures"],
  ["Equipment", "A/D - Equipment", "Other Fixed Assets", "A/D - Other Fixed Assets", "Intangible Assets", "A/D - Intangible Assets"]
];

const AssetGroupLabels = ["Group 1", "Group 2", "Group 3"];
const colorPalette = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c", "#8dd1e1"];

export const Assets = ({ data = [] }) => {
  const getMonthlyData = (data) => {
    const months = [
      "Jan", "Feb", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const monthlyData = months.map((month) => {
      const monthData = { month };

      const groupsTotal = Array.from({ length: AssetGroups.length }, () => 0);
      let totalFixedAssets = 0;

      data.forEach((row) => {
        const overhead = row.Overhead.trim();
        const value = row[month];

        const index = FixedAssets.indexOf(overhead);
        if (index !== -1) {
          const belongsToGroup = AssetGroups.findIndex(group => group.includes(overhead));
          if (belongsToGroup !== -1) {
            groupsTotal[belongsToGroup] += value;
          } else if (overhead === "Total Fixed Assets") {
            totalFixedAssets += value;
          }
        }
      });

      AssetGroups.forEach((group, index) => {
        const groupName = `Group ${index + 1}`;
        monthData[groupName] = groupsTotal[index];
      });

      monthData["Total Fixed Assets"] = totalFixedAssets;

      return monthData;
    });

    return monthlyData;
  };

  const filteredData = useMemo(() => getMonthlyData(data), [data]);

  return (
    <Box mt={10} p={4} borderWidth="1px" borderRadius="md" width="100%" overflowX="auto">
      <Box justify="center" mb={4}>
        {AssetGroups.map((group, index) => (
          <Box key={index} mx={4}>
            <Text fontWeight="bold">Group {index + 1}</Text>
            {group.map((asset, assetIndex) => (
              <span key={assetIndex} style={{ marginRight: '5px' }}>{asset} |</span>
            ))}
          </Box>
        ))}
      </Box>
      <Box width={{ base: "700px", md: "100%" }}>
        <Heading size="md" mb={4}>
          Fixed Assets
        </Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData} margin={{ top: 10, right: 10, left: 50, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {AssetGroups.map((_, index) => (
              <Bar
                key={index}
                dataKey={`Group ${index + 1}`}
                fill={colorPalette[index % colorPalette.length]}
                barSize={20}
              />
            ))}
            <Bar
              dataKey="Total Fixed Assets"
              fill={colorPalette[AssetGroups.length % colorPalette.length]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
