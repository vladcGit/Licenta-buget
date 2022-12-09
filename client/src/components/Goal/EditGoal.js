import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import GoalOperations from "./GoalOperations";

export default function EditGoal() {
  const [amount, setAmount] = useState(0.0);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const { goalId } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/goal/${goalId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      const userData = res.data;
      setAmount(userData.amount);
      setName(userData.name);
    };

    fetchData();
  }, [goalId]);

  const editGoal = async () => {
    try {
      await axios.put(
        `/api/goal/${goalId}`,
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
      handler={editGoal}
      titleText="Edit goal"
      buttonText="Save"
    />
  );
}
