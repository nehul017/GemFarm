"use client";
import React from "react";
import PnLDetailForm from "@/components/pnl/PnLDetailForm";
import { mockPnLData, PnLData } from "@/components/utils/utils";
import Header from "@/components/layout/header";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const EditPnLData = () => {
  const [pnlData, setPnlData] = React.useState<PnLData>(mockPnLData);
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleDataUpdate = (updatedData: typeof pnlData) => {
    setPnlData(updatedData);
  };

  return (
    <div className="bg-gradient-to-r from-green50 to-blue-50">
      {loading ? (
        <div className="flex justify-center items-center h-dvh">
          <div className="relative w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Header
            header="Edit Profit & Loss"
            isNotificationIcon={true}
            isOnlyBackButton={true}
            isWhite={true}
            isShowProfile={true}
          />
          <div className="container mx-auto px-5 bg-gradient-to-r from-green50 to-blue-50 pb-10">
            <PnLDetailForm data={pnlData} onDataUpdate={handleDataUpdate} />
          </div>
        </>
      )}
    </div>
  );
};

export default EditPnLData;
