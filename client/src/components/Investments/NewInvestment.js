import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InvestmentsOperations from "./InvestmentsOperations";

export default function NewInvestment() {
  const [amount, setAmount] = useState(0.0);
  const [name, setName] = useState("");
  const [performance, setPerformance] = useState(0.0);

  const navigate = useNavigate();

  const createInvestment = async () => {
    try {
      await axios.post(
        "/api/investment",
        {
          amount,
          name,
          return: performance,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      navigate("/investments");
    } catch (e) {
      const err = e.response;
      console.log(err);
      alert("error");
    }
  };

  return (
    <InvestmentsOperations
      amount={amount}
      setAmount={setAmount}
      name={name}
      setName={setName}
      performance={performance}
      setPerformance={setPerformance}
      handler={createInvestment}
      titleText={"Enter a new investment"}
      buttonText={"Add"}
    />
  );
}
