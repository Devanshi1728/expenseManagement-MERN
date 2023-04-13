import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Box } from "@mui/material";
import List from "./List";
import apiSlice from "../store/apiSlice";

const Form = () => {
  const { register, handleSubmit, resetField } = useForm();

  const [addTransaction] = apiSlice.useAddTransactionMutation();
  const onSubmit = async (data) => {
    if (data) await addTransaction(data).unwrap();
    resetField("amount");
    resetField("name");
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="form max-w-sm mx-auto-w-96">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white p-3"
      >
        Add Transaction
      </button>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <h1 className="font-bold pb-4 text-xl">Form</h1> */}
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="input-group">
                <input
                  className="form-input"
                  placeholder="House Rent SIP Bills"
                  type="text"
                  {...register("name")}
                />
              </div>
              <select className="form-input" {...register("type")}>
                <option value="Investment">Investment</option>
                <option value="Savings">Savings</option>
                <option value="Expenses">Expenses</option>
              </select>
              <div className="input-group">
                <input
                  type="number"
                  {...register("amount")}
                  placeholder="amount"
                  className="form-input"
                />
              </div>
              <div className="submit-btn">
                <button className="border py-2 bg-indigo-500 w-full text-white">
                  Add
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
      <List />
    </div>
  );
};

export default Form;
