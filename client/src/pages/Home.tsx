import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import ModalContent from "./ModalContentReminder";
import ModalContentTask from "./ModalContentTask";
import ModalContentMeeting from "./ModalContentMeeting";
import ModalContentUpdateTask from "./ModelContentUpdateTask";
import ModalContentUpdateMeeting from "./ModalContentUpdateMeeting";
import ModalContentUpdateReminder from "./ModalContentUpdateReminder";
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
  const [taskList, setTask] = useState<tasks[]>();
  const [meetingList, setMeeting] = useState<meetings[]>();
  const [reminderList, setReminder] = useState<reminders[]>();

  const [showModal, setShowModal] = useState(false);
  const [showModalTask, setShowModalTask] = useState(false);
  const [showModalMeeting, setShowModalMeeting] = useState(false);

  const [showUpdateTask, setUpdateTask] = useState(false);
  const [showUpdateMeeting, setUpdateMeeting] = useState(false);
  const [showUpdateReminder, setUpdateReminder] = useState(false);

  const [taskID, setTaskID] = useState("");
  const [meetingID, setMeetingID] = useState("");
  const [reminderID, setReminderID] = useState("");

  const baseURL = "http://localhost:5173/";

  const addReminder = () => {
    setShowModal(true);
  };

  const addTask = () => {
    setShowModalTask(true);
  };

  const addMeeting = () => {
    setShowModalMeeting(true);
  };

  const updateTask = (itemID: string) => {
    setTaskID(itemID);
    setUpdateTask(true);
  };

  const updateMeeting = (itemID: string) => {
    setMeetingID(itemID);
    setUpdateMeeting(true);
  };

  const updateReminder = (itemID: string) => {
    setReminderID(itemID);
    setUpdateReminder(true);
  };

  const handleClose = async () => {
    const updatedData = await fetch_data(uid);
    if (updatedData) {
      setTask(updatedData.tasks);
      setMeeting(updatedData.meetings);
      setReminder(updatedData.reminders);
    }
    setShowModal(false);
    setShowModalTask(false);
    setShowModalMeeting(false);
    setUpdateTask(false);
    setUpdateMeeting(false);
    setUpdateReminder(false);
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
      setTask(updatedData.tasks);
      setMeeting(updatedData.meetings);
      setReminder(updatedData.reminders);
    }
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
      setTask(updatedData.tasks);
      setMeeting(updatedData.meetings);
      setReminder(updatedData.reminders);
    }
  };

  // Console logs for debugging
  console.log("User ID:", uid);
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
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => updateTask(item.id)}
                  >
                    UPDATE TASK
                  </Button>
                  <ModalContentUpdateTask
                    open={showUpdateTask}
                    uid={uid}
                    onClose={handleClose}
                    docID={taskID}
                  />
                  <Button
                    type="button"
                    color="error"
                    onClick={() => deleteTask(item.uid, item.id)}
                  >
                    DELETE TASK
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
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => updateMeeting(item.id)}
                  >
                    UPDATE MEETING
                  </Button>
                  <ModalContentUpdateMeeting
                    open={showUpdateMeeting}
                    uid={uid}
                    onClose={handleClose}
                    docID={meetingID}
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
                    <li>Date: {item.date}</li>
                  </ul>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => updateReminder(item.id)}
                  >
                    UPDATE REMINDER
                  </Button>
                  <ModalContentUpdateReminder
                    uid={uid}
                    open={showUpdateReminder}
                    onClose={handleClose}
                    docID={reminderID}
                  ></ModalContentUpdateReminder>
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