import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InvestmentsOperations from "./InvestmentsOperations";

export default function EditInvestment() {
  const [amount, setAmount] = useState(0.0);
  const [name, setName] = useState("_");
  const [performance, setPerformance] = useState(0.0);

  const navigate = useNavigate();
  const { investmentId } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/investment/${investmentId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      const userData = res.data;
      setAmount(userData.amount);
      setName(userData.name);
      setPerformance(userData.return);
    };

    fetchData();
  }, [investmentId]);

  const editInvestment = async () => {
    try {
      await axios.put(
        `/api/investment/${investmentId}`,
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
      handler={editInvestment}
      titleText={"Edit investment"}
      buttonText={"Save"}
    />
  );
}
