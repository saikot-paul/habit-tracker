import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './ModalUpdateReminder.css'; 
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import axios from "axios";

type Props =  {
  open: boolean;
  uid: string;
  reminderId: string;
  onClose: () => void;
}

export default function ModalUpdateReminder({ open, onClose, uid, reminderId}: Props) {
  const baseURL = "http://localhost:3000/";
  const [description, setDescription] = useState("");
  const [due_date, setDate] = useState("");
  
  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await axios.get(baseURL + "fetch_data", {
          params: {
            uid: uid,
          },
        });
        const taskData = response.data; 
        setDescription(taskData.description);
        setDate(taskData.due_date);
      } catch (error) {
        console.error("Error fetching reminder details:", error);
      }
    };

    fetchMeetingDetails();
  }, [reminderId, uid, baseURL]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await axios.put(baseURL + `update_reminder/${uid}`, {
        uid: uid,
        due_date: due_date,
        description: description,
      });
      
      onClose();
      
    } catch (error) {
      
      console.error("Error submitting form:", error);
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
                value={due_date}
                onChange={(e) => setDate(e.target.value)}
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