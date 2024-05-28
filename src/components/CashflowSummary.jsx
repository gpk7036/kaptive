import { Box, Button, Flex, Text } from "@chakra-ui/react";

import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

import { Select } from "@chakra-ui/react";

const CashflowSummary = ({ data = [] }) => {
  const [view, setView] = useState("decimal");
  const [currency, setCurrency] = useState("rupees");

  const calculatePercentages = (obj) => {
    const sum = Object.values(obj).reduce((acc, value) => {
      if (!isNaN(value)) {
        return acc + value;
      } else return acc;
    }, 0);

    const percentages = {};
    for (const key of Object.keys(obj)) {
      percentages[key] = !isNaN(obj[key])
        ? ((obj[key] / sum) * 100).toFixed(2)
        : obj[key];
    }

    return percentages;
  };

  console.log(data.map(calculatePercentages));

  const monthNames = [
    "January",
    "February",
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

  return (
    <Box
      id="cashFlowSummary"
      bgColor={"white"}
      m={{ sm: 2, md: 3, lg: 5 }}
      p={{ sm: 2, md: 3, lg: 5 }}
      borderRadius={5}
    >
      <Flex justify={"space-between"} my={5} flexWrap={"wrap"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={600}>
            Cashflow Summery
          </Text>
        </Box>

        <Flex gap={2} flexWrap={"wrap"}>
          <Button
            size="md"
            bgColor={view === "decimal" ? "#BEE3F8" : ""}
            onClick={() => {
              setView("decimal");
            }}
          >
            Decimal View
          </Button>
          <Button
            size="md"
            bgColor={view === "percent" ? "#BEE3F8" : ""}
            onClick={() => {
              setView("percent");
            }}
          >
            Percentage View
          </Button>

          <Select
            width={"fit-content"}
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
          >
            <option value="rupees">Rupees</option>
            <option value="dollar">Dollar</option>
            <option value="euro">Euro</option>
          </Select>
        </Flex>
      </Flex>
      <Box
        maxH="300px"
        borderWidth="1px"
        borderRadius="md"
        width="100%"
        overflowX="scroll"
        overflowY="scroll"
      >
        <Table size={{ base: "sm", lg: "md" }}>
          <Thead position="sticky" top="0" bg="gray.100" zIndex="docked">
            <Tr>
              <Th maxW={"200px"} minW={"200px"} whiteSpace={"wrap"}>
                CashFlow
              </Th>
              {monthNames.map((month) => {
                return <Th key={month}>{month}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {view === "decimal" &&
              data.map((item, index) => {
                return (
                  <Tr key={item.Overhead + index}>
                    {Object.keys(item).map((key, i) => {
                      return (
                        <Td
                          key={key}
                          maxW={i === 0 ? "200px" : "150px"}
                          minW={i === 0 ? "200px" : "150px"}
                          whiteSpace={"wrap"}
                        >
                          {isNaN(item[key])
                            ? item[key]
                            : currency == "rupees"
                            ? Math.floor(item[key])
                            : currency == "dollar"
                            ? Math.floor(item[key] / 83.15)
                            : Math.floor(item[key] / 90.28)}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}

            {view === "percent" &&
              data.map(calculatePercentages).map((item, index) => {
                return (
                  <Tr key={item.Overhead + index}>
                    {Object.keys(item).map((key, i) => {
                      return (
                        <Td
                          key={key}
                          maxW={i === 0 ? "200px" : "100px"}
                          minW={i === 0 ? "200px" : "100px"}
                          whiteSpace={"wrap"}
                        >
                          {isNaN(item[key]) ? item[key] : item[key] + "%"}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export { CashflowSummary };
