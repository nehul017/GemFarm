import React from "react";
import { formatCurrency } from "../utils/utils"; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MonthData } from "../utils/utils";

type PnLTableProps = {
  data: MonthData[];
};

const PnLTable: React.FC<PnLTableProps> = ({ data }) => {
  return (
    <div className="mt-6 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Expenses</TableHead>
            <TableHead className="text-right">Profit</TableHead>
            <TableHead className="text-right">Profit Margin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((month, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{month.month}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(month.revenue)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(month.expenses)}
              </TableCell>
              <TableCell
                className={`text-right ${
                  month.profit >= 0 ? "text-farm-green" : "text-farm-red"
                }`}
              >
                {formatCurrency(month.profit)}
              </TableCell>
              <TableCell
                className={`text-right ${
                  month.profitMargin >= 0 ? "text-farm-green" : "text-farm-red"
                }`}
              >
                {month.profitMargin.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PnLTable;
