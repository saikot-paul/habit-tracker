import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './calender.css';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function BasicDateCalendar() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [isModalOpen, setModalOpen] = React.useState(false)

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className = "dateCalendar">

      <Modal
        open={isModalOpen}
        onClose={() => {setModalOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx = {style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {date?.format('dddd, MMMM DD, YYYY').toString()}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Event:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          3:00PM-5:00PM: Fishing
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 6 }}>
            Task:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Mow the Lawn
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 6 }}>
           Reminder:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           CPS714 Project Due Today :0
          </Typography>
        </Box>
      </Modal>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar 
          value = {date}
          onChange={(props) => {setDate(props); setModalOpen(true)}} 
          sx = {{
            fontSize: '9.5rem',
          }}
        />
      </LocalizationProvider>
    </div>

    
  );
}