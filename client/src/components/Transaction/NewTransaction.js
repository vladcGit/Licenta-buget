import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TransactionOperations from "./TransactionOperations";

export default function NewTransaction() {
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("Outflow");
  const [amount, setAmount] = useState(0.0);
  const [description, setDescription] = useState("");
  const [recurrent, setRecurrent] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const [openModal, setOpenModal] = React.useState(false);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category/all");
      setCategories(res.data);
      if (res.data.length > 0) setCategoryName(res.data[0].name);
    } catch (e) {
      const err = e.response;
      console.log(err);
      alert("error");
    }
  };

  const fetchCategoryCallback = useCallback(fetchCategories, []);

  useEffect(() => {
    fetchCategoryCallback();
  }, [fetchCategoryCallback]);

  const createTransaction = async () => {
    try {
      const category_id = Number.parseInt(
        categories.filter((c) => c.name === categoryName)[0].id
      );

      if (amount <= 0) return alert("Amount must be bigger than 0");

      await axios.post(
        "/api/transaction",
        {
          date,
          type,
          amount,
          description,
          recurrent,
          category_id,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      navigate("/transactions");
    } catch (e) {
      const err = e.response;
      console.log(err);
      alert("error");
    }
  };

  return (
    <TransactionOperations
      date={date}
      setDate={setDate}
      type={type}
      setType={setType}
      amount={amount}
      setAmount={setAmount}
      description={description}
      setDescription={setDescription}
      recurrent={recurrent}
      setRecurrent={setRecurrent}
      categories={categories}
      setCategories={setCategories}
      categoryName={categoryName}
      setCategoryName={setCategoryName}
      openModal={openModal}
      setOpenModal={setOpenModal}
      handler={createTransaction}
      titleText={"Enter a new transaction"}
      buttonText={"Add"}
      fetchCategories={fetchCategoryCallback}
    />
  );
}
