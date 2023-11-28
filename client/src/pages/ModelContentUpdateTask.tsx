import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./ModalContent.css";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

type Props = {
  open: boolean;
  uid: string;
  docID: string;
  onClose: () => void;
};

export default function ModalContentUpdateTask({
  open,
  onClose,
  uid,
  docID,
}: Props) {
  const baseURL = "http://localhost:5173/";
  const [description, setDescription] = useState("");
  const [due_date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("uid:", uid);
      console.log("description:", description);
      console.log("date:", due_date);

      await axios.post(baseURL + "update_task", {
        uid: uid,
        due_date: due_date,
        description: description,
        docID: docID,
      });

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-describedby="modal-description">
      <div className="modal-container">
        <Button onClick={onClose}>Close</Button>
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                variant="outlined"
                margin="normal"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Due Date"
                variant="outlined"
                margin="normal"
                fullWidth
                value={due_date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
