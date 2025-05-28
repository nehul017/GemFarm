import React from "react";
import { formatCurrency } from "../utils/utils"; 

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PnLData } from "../utils/utils";

type PnLSummaryProps = {
  data: PnLData;
};

const PnLSummary: React.FC<PnLSummaryProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-farm-primary">
            {formatCurrency(data.totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            For year {data.year}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-farm-red">
            {formatCurrency(data.totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            For year {data.year}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${data.totalProfit >= 0 ? 'text-farm-green' : 'text-farm-red'}`}>
            {formatCurrency(data.totalProfit)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            For year {data.year}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${data.averageProfitMargin >= 0 ? 'text-farm-green' : 'text-farm-red'}`}>
            {data.averageProfitMargin.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Average for {data.year}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PnLSummary;