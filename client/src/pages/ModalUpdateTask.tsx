import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './ModalContentMeeting.css'; 
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import axios from "axios";

type Props = {
  open: boolean;
  uid: string;
  taskId: string; // Task ID to be updated
  onClose: () => void;
}


export default function ModalUpdateTask({ open, onClose, uid, taskId }: Props) {
  const baseURL = "http://localhost:3000/";
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    // Fetch the task details based on taskId
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(baseURL + "fetch_data", {
          params: {
            uid: uid,
          },
        });
        const taskData = response.data; // Assuming the fetched data is the task details
        setDescription(taskData.description);
        setDueDate(taskData.due_date);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId, uid, baseURL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(baseURL + `update_task/${uid}`, {
        uid: uid,
        due_date: dueDate,
        description: description,
      });
      
      onClose();
      
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-describedby="modal-description"
    >
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
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};