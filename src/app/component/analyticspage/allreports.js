import React from "react";
import ReportDownloadCard from "./salesreport";
import Salesimg from "@/icons/reports/salesreport.jpg";
import Attendance from "@/icons/reports/attendancerep.png";
import Expense from "@/icons/reports/expense.png";
import OrderItems from "@/icons/reports/orderedproduct.png";
import Retailer from "@/icons/reports/retailer.png";
import Product from "@/icons/reports/productreport.png";
import Distributor from "@/icons/reports/distributorrepo.png";


const allreports = () => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      <ReportDownloadCard
        title="Sales Report"
        reportType="sales"
        imageSrc={Salesimg}
      />
      <ReportDownloadCard
        title="Product Report"
        reportType="product"
        imageSrc={Product}
      />

      <ReportDownloadCard
        title="Attendance Report"
        reportType="attendance"
         imageSrc={Attendance}
      />

      <ReportDownloadCard
        title="Expense Report"
        reportType="expense"
         imageSrc={Expense}
      />
      <ReportDownloadCard
        title="Order Items Report"
        reportType="orderItems"
         imageSrc={OrderItems}
      />
      <ReportDownloadCard
        title="Retailers Report"
        reportType="retailer"
         imageSrc={Retailer}
      />
      <ReportDownloadCard
        title="Distributor Report"
        reportType="distributor"
         imageSrc={Distributor}
      />
    </div>
  );
};

export default allreports;
