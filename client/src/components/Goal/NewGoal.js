import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoalOperations from "./GoalOperations";

export default function NewGoal() {
  const [amount, setAmount] = useState(0.0);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const createGoal = async () => {
    try {
      await axios.post(
        "/api/goal",
        {
          amount,
          name,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      navigate("/goals");
    } catch (e) {
      const err = e.response;
      console.log(err);
      alert("error");
    }
  };

  return (
    <GoalOperations
      amount={amount}
      setAmount={setAmount}
      name={name}
      setName={setName}
      handler={createGoal}
      titleText="Enter a new goal"
      buttonText="Add"
    />
  );
}
