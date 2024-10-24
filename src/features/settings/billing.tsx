"use client"
import DummyData from "@/helper/dummy-data";
import  { Bill } from "@/helper/dummy-data";
import React, { useState } from "react";


const Billing: React.FC = () => {
    const [bills, setBills] = useState<Bill[]>(DummyData.BILLS);

    const getPaymentStatus = (status: string) => {
        if (status === "Paid") return <div className="badge badge-success">{status}</div>;
        if (status === "Pending") return <div className="badge badge-primary">{status}</div>;
        else return <div className="badge badge-ghost">{status}</div>;
    }

    return (
        <>
        </>
    )
}

export default Billing;
