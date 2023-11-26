import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './ModalUpdateMeeting.css'; 
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import axios from "axios";

type Props =  {
  open: boolean;
  uid: string;
  meetingId: string;
  onClose: () => void;
}

export default function ModalUpdateMeeting({ open, onClose, uid, meetingId }: Props) {
  const baseURL = "http://localhost:3000/";
  const [description, setDescription] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await axios.get(baseURL + `get_task/${meetingId}`, {
          params: {
            uid: uid,
          },
        });
        const taskData = response.data; 
        setDescription(taskData.description);
        setStartTime(taskData.start_time);
        setEndTime(taskData.end_time);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchMeetingDetails();
  }, [meetingId, uid, baseURL]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        
        console.log("uid:", uid);
        console.log("description:", description);
        console.log("start time:", start_time);
        console.log("end time:", end_time);
      
        await axios.put(baseURL + "create_meeting", {
        uid: uid,
        start_time: start_time,
        end_time: end_time,
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
                label="Start Time"
                variant="outlined"
                margin="normal"
                fullWidth
                value={start_time}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="End Time"
                variant="outlined"
                margin="normal"
                fullWidth
                value={end_time}
                onChange={(e) => setEndTime(e.target.value)}
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