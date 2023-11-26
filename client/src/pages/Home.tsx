import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import ModalContent from './ModalContent';

import ModalContentTask from './ModalContentTask';
import ModalContentMeeting from './ModalContentMeeting';
import ModalUpdateTask from './ModalUpdateTask';

import Button from "@mui/material/Button";

type Props = {
  uid: string;
};

interface tasks {
  description: string;
  due_date: string;
  id: string;
  uid: string;
}

interface meetings {
  description: string;
  end_time: string;
  start_time: string;
  id: string;
  uid: string;
}

interface reminders {
  description: string;
  date: string;
  id: string;
  uid: string;
}

export default function MainContent({ uid }: Props) {
  const [userData, setUserData] = useState<string>("");
  const [taskList, setTask] = useState<tasks[]>();
  const [meetingList, setMeeting] = useState<meetings[]>();
  const [reminderList, setReminder] = useState<reminders[]>();
  const [showModal, setShowModal] = useState(false);

  const [showModalTask, setShowModalTask] = useState(false);
  const [showModalMeeting, setShowModalMeeting] = useState(false);
  const [showModalUpdateTask, setShowModalUpdateTask] = useState(false);
  const [showModalUpdateMeeting, setShowModalUpdateMeeting] = useState(false); // For meeting updates
  const [showModalUpdateReminder, setShowModalUpdateReminder] = useState(false); // For reminder updates

  const [taskIdToUpdate, setTaskIdToUpdate] = useState("");
  const [meetingIdToUpdate, setMeetingIdToUpdate] = useState("");
  const [reminderIdToUpdate, setReminderIdToUpdate] = useState("");

  const baseURL = "http://localhost:3000/";
  
  const addReminder = () => {
    setShowModal(true);
  };


  const addTask = () => {
    setShowModalTask(true);
  };

  const addMeeting = () => {
    setShowModalMeeting(true);
  };

  
  const handleClose = async () => {
    const updatedData = await fetch_data(uid);
    if (updatedData) {
      setUserData(updatedData);
      setTask(updatedData.tasks);
      setMeeting(updatedData.meetings);
      setReminder(updatedData.reminders);
    }
    setShowModal(false);
    setShowModalTask(false);
    setShowModalMeeting(false);

    setShowModalUpdateReminder(false); //Close Update Reminder Modal
    setShowModalUpdateTask(false); // Close the update task modal
    setShowModalUpdateMeeting(false); // Close the update task modal
  };

  async function fetch_data(user_id: string) {
    try {
      const response = await axios.get(baseURL + "fetch_data", {
        params: {
          uid: user_id,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  useEffect(() => {
    fetch_data(uid).then((data) => {
      setUserData(data);
      setTask(data.tasks);
      setMeeting(data.meetings);
      setReminder(data.reminders);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTask = async (uid: string, task_id: string) => {
    console.log(task_id);
    console.log(uid);

    await axios.delete(baseURL + "delete_task", {
      params: {
        uid: uid,
        id: task_id,
      },
    });

    const updatedData = await fetch_data(uid);
    if (updatedData) {
      setUserData(updatedData);
      setTask(updatedData.tasks);
      setMeeting(updatedData.meetings);
      setReminder(updatedData.reminders);
    }
  };

  const updateTask = (taskId: string) => {
    setTaskIdToUpdate(taskId); // Set the task ID to be updated
    setShowModalUpdateTask(true); // Show the update task modal
  };
  
  const updateMeeting = (meetingId: string) => {
    setMeetingIdToUpdate(meetingId);
    setShowModalUpdateMeeting(true);
  };

  const updateReminder = (reminderId: string) => {
    setReminderIdToUpdate(reminderId);
    setShowModalUpdateReminder(true);
  };

    const deleteReminder = async (uid: string, reminder_id: string) => {
    console.log(reminder_id);
    console.log(uid);

    await axios.delete(baseURL + "delete_reminder", {
      params: {
        uid: uid,
        id: reminder_id,
      },
    });

    const updatedData = await fetch_data(uid);
    if (updatedData) {
      setUserData(updatedData);
      setTask(updatedData.tasks);
      setMeeting(updatedData.meetings);
      setReminder(updatedData.reminders);
    }
  };
  const deleteMeeting = async (uid: string, reminder_id: string) => {
    console.log(reminder_id);
    console.log(uid);

    await axios.delete(baseURL + "delete_meeting", {
      params: {
        uid: uid,
        id: reminder_id,
      },
    });

    const updatedData = await fetch_data(uid);
    if (updatedData) {
      setUserData(updatedData);
      setTask(updatedData.tasks);
      setMeeting(updatedData.meetings);
      setReminder(updatedData.reminders);
    }
  };

  // Console logs for debugging
  console.log("User ID:", uid);
  console.log("User Data:", userData);
  console.log("Tasks: ", taskList);
  console.log("Meetings: ", meetingList);
  console.log("Reminders: ", reminderList);

  return (
    <div className="main-container">
      <div className="header">
        <h1>Home</h1>
        <p>Here are your upcoming tasks, meetings and reminders</p>
      </div>
      <div className="content">
        <div className="content-container">
          {taskList && taskList.length > 0 ? (
            <div className="item">
              <h2>Tasks</h2>
              {taskList.map((item) => (
                <div className="sub-item" key={item.id}>
                  <h3>{item.description}</h3>
                  <ul>
                    <li>Due Date: {item.due_date}</li>
                  </ul>
                  <Button type="button" color="primary" onClick={() => updateTask(item.id)}>
                    UPDATE TASK
                  </Button>
                  <ModalUpdateTask
                  open={showModalUpdateTask}
                  onClose={handleClose} // Function to close the modal
                  uid={uid}
                  taskId={taskIdToUpdate}
                  />
                  <Button
                    type="button"
                    color="error"
                    onClick={() => deleteTask(item.uid, item.id)}
                  >
                    Delete Task
                  </Button>
                </div>
              ))}
              <div className="add-remove">
                <Button type="button" color="success" onClick={addTask}>
                  ADD TASK
                </Button>
              </div>
              <ModalContentTask
                open={showModalTask}
                onClose={handleClose}
                uid={uid}
              />
              
            </div>
          ) : (
            <div className="item">
              <div>No tasks to display</div>
              <div className="add-remove">
                <Button type="button" color="success" onClick={addTask}>
                  ADD TASK
                </Button>
                <ModalContentTask
                  open={showModalTask}
                  onClose={handleClose}
                  uid={uid}
                />
              </div>
            </div>
          )}
          {meetingList && meetingList.length > 0 ? (
            <div className="item">
              <h2>Meetings</h2>
              {meetingList.map((item) => (
                <div className="sub-item" key={item.id}>
                  <h3>{item.description}</h3>
                  <ul>
                    <li>Start: {item.start_time}</li>
                    <li>End: {item.end_time}</li>
                  </ul>
                  <Button type="button" color="primary" onClick={() => updateMeeting(item.id)}>
                    UPDATE MEETING
                  </Button>
                  <ModalUpdateMeeting
                  open={showModalUpdateMeeting}
                  onClose={handleClose}
                  uid={uid}
                  meetingId={meetingIdToUpdate}
              />
                  <Button
                    type="button"
                    color="error"
                    onClick={() => deleteMeeting(item.uid, item.id)}
                  >
                    DELETE MEETING
                  </Button>
                </div>
              ))}
              <div className="add-remove">
                <Button type="button" color="success" onClick={addMeeting}>
                  ADD MEETING
                </Button>
              </div>
              <ModalContentMeeting
                open={showModalMeeting}
                onClose={handleClose}
                uid={uid}
              />
              
            </div>
          ) : (
            <div className="item">
              <div>No meetings to display</div>
              <div className="add-remove">
                <Button type="button" color="success" onClick={addMeeting}>
                  ADD MEETING
                </Button>
                <ModalContentMeeting
                  open={showModalMeeting}
                  onClose={handleClose}
                  uid={uid}
                />
              </div>
            </div>
          )}
          {reminderList && reminderList.length > 0 ? (
            <div className="item">
              <h2>Reminders</h2>
              {reminderList.map((item) => (
                <div className="sub-item" key={item.id}>
                  <h3>{item.description}</h3>
                  <ul>
                    <li>{item.description}</li>
                    <li>Date: {item.date}</li>
                  </ul>
                  <Button type="button" color="primary" onClick={() => updateReminder(item.id)}>
                  UPDATE REMINDER
                  </Button>
                  <ModalUpdateReminder
                  open={showModalUpdateReminder}
                  onClose={handleClose}
                  uid={uid}
                  reminderId={reminderIdToUpdate}
                  />
                  <Button
                    type="button"
                    color="error"
                    onClick={() => deleteReminder(item.uid, item.id)}
                  >              
                    DELETE REMINDER
                  </Button>
                </div>
              ))}
              <div className="add-remove">
                <Button type="button" color="success" onClick={addReminder}>
                  ADD REMINDER
                </Button>
              </div>
              <ModalContent open={showModal} onClose={handleClose} uid={uid} />
            </div>
          ) : (
            <div className="item">
              <div>No reminders to display</div>
              <Button type="button" color="success" onClick={addReminder}>
                ADD REMINDER
              </Button>
              <ModalContent open={showModal} onClose={handleClose} uid={uid} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}