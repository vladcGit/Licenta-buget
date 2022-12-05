import axios from "axios";
import React, { useState, useEffect } from "react";
import StickyLayout from "../StickyLayout";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/transaction/all", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setTransactions(res.data);
      console.log(res.data);
    };

    fetchData();
  }, []);

  return (
    <StickyLayout>
      {transactions.map((t) => (
        <div key={t.id}>{t.amount}</div>
      ))}
    </StickyLayout>
  );
}
