import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TransactionOperations from "./TransactionOperations";

export default function EditTransaction() {
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("Outflow");
  const [amount, setAmount] = useState(0.0);
  const [description, setDescription] = useState("");
  const [recurrent, setRecurrent] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const [openModal, setOpenModal] = React.useState(false);

  const navigate = useNavigate();
  const { transactionId } = useParams();

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/transaction/${transactionId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      const userData = res.data;

      setDate(new Date(userData.date));
      setType(userData.type);
      setAmount(userData.amount);
      setDescription(userData.description);
      setRecurrent(userData.recurrent);

      const category = categories.filter(
        (c) => c.id === userData.category_id
      )[0];
      setCategoryName(category?.name);
    };

    fetchData();
  }, [transactionId, categories]);

  const editTransaction = async () => {
    try {
      const category_id = Number.parseInt(
        categories.filter((c) => c.name === categoryName)[0].id
      );

      if (amount <= 0) return alert("Amount must be bigger than 0");

      await axios.put(
        `/api/transaction/${transactionId}`,
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
      handler={editTransaction}
      titleText={"Edit transaction"}
      buttonText={"Save"}
      fetchCategories={fetchCategoryCallback}
    />
  );
}
