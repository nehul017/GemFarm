// app/farm-pnl/page.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import PnLSummary from "../../components/pnl/PnLSummary";
import PnLChart from "../../components/pnl/PnLChart";
import PnLTable from "../../components/pnl/PnLTable";
import FilePdfIcon from "@/icons/FilePdfIcon";
import FileExcelIcon from "@/icons/FileExcelIcon";
import Button from "@/components/common/button";
import { mockPnLData, PnLData } from "@/components/utils/utils";
import Header from "@/components/layout/header";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const FarmPnLPage = () => {
  const [pnlData, setPnlData] = React.useState(mockPnLData);
  const { loading } = useSelector((state: RootState) => state.auth);

  const exportPDF = (data: PnLData) => {
    // This is a placeholder function
    // In a real implementation, we would use a library like jsPDF
    console.log("Exporting data to PDF:", data);

    // For now, let's just show a toast notification
    toast.success("Your Farm PnL data is being exported as PDF.");

    // Simulate download delay
    setTimeout(() => {
      toast.success(
        "Farm PnL for " + data.year + " has been downloaded as PDF."
      );
    }, 2000);
  };

  // Function to export PnL data as Excel
  const exportExcel = (data: PnLData) => {
    // This is a placeholder function
    // In a real implementation, we would use a library like xlsx.js
    console.log("Exporting data to Excel:", data);

    // For now, let's just show a toast notification
    toast.success("Your Farm PnL data is being exported as Excel.");

    // Simulate download delay
    setTimeout(() => {
      toast.success(
        "Farm PnL for " + data.year + " has been downloaded as Excel."
      );
    }, 2000);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-dvh">
          <div className="relative w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <ToastContainer position="top-right" autoClose={500} />
          <Header
            header="Profit & Loss"
            isNotificationIcon={true}
            isOnlyBackButton={true}
            isWhite={true}
            isShowProfile={true}
          />
          <div className="container mx-auto px-5 bg-gradient-to-r from-green50 to-blue-50 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="text-black mt-4">
                <p className="text-muted-foreground">
                  Track your farm's financial performance over time
                </p>
              </div>
              {/* <div className="flex space-x-4 mt-4 md:mt-0"> */}
              <Button
                buttonClass="flex items-center mt-2"
                green
                onClick={() => exportPDF(pnlData)}
              >
                <FilePdfIcon className="mr-2" />
                Export PDF
              </Button>
              <Button
                buttonClass="flex items-center mt-1"
                green
                onClick={() => exportExcel(pnlData)}
              >
                <FileExcelIcon className="mr-2 h-5 w-5" />
                Export Excel
              </Button>
              {/* </div> */}
            </div>

            <PnLSummary data={pnlData} />

            <Card className="mt-8 bg-white">
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>
                  Revenue, expenses and profit for each month of {pnlData.year}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PnLChart data={pnlData.monthlyData} />
              </CardContent>
            </Card>

            <Card className="mt-8 bg-white">
              <CardHeader>
                <CardTitle>PnL Statement</CardTitle>
                <CardDescription>
                  Detailed monthly breakdown of your farm's financial
                  performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PnLTable data={pnlData.monthlyData} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default FarmPnLPage;
