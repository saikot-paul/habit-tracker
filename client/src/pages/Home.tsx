import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

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
  reminder_time: string;
  id: string;
  uid: string;
}

export default function MainContent({ uid }: Props) {
  const [userData, setUserData] = useState<string>("");
  const [taskList, setTask] = useState<tasks[]>();
  const [meetingList, setMeeting] = useState<meetings[]>();
  const [reminderList, setReminder] = useState<reminders[]>();
  const baseURL = "http://localhost:3000/";

  useEffect(() => {
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
    fetch_data(uid).then((data) => {
      setUserData(data);
      setTask(data.tasks);
      setMeeting(data.meetings);
      setReminder(data.reminders);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className="item-container">
          {taskList && taskList.length > 0 ? (
            <div className="item">
              <h2>Tasks</h2>
              {taskList.map((item, index) => (
                <div className="sub-item" key={item.id}>
                  <h3>Task {index + 1}</h3>
                  <ul>
                    <li>{item.description}</li>
                    <li>Due: {item.due_date}</li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="item">No tasks to display.</div>
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
                </div>
              ))}
            </div>
          ) : (
            <div className="item">No tasks to display.</div>
          )}
          {reminderList && reminderList.length > 0 ? (
            <div className="item">
              <h2>Reminders</h2>
              {reminderList.map((item, index) => (
                <div className="sub-item" key={item.id}>
                  <h3>Reminder {index + 1}</h3>
                  <ul>
                    <li>{item.description}</li>
                    <li>Date: {item.reminder_time}</li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="item">No tasks to display.</div>
          )}
        </div>
        <div className="button-container">
          <p className="button-header">ADD ITEM</p>
          <button className="add-item">+</button>
        </div>
        <div className="button-container">
          <p className="button-header">ADD ITEM</p>
          <button className="add-item">+</button>
        </div>
      </div>
    </div>
  );
}
