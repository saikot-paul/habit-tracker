import BasicDateCalendar from "../components/calender/BasicDateCalender";
import NavigationBar from "../components/navBar/NavigationBar";
import AddRemove from "./AddRemove";
import Home from "./Home";
import { Route, Routes, useLocation } from "react-router-dom";

export default function MainContent() {
  const location = useLocation();

  return (
    <div className="main-content">
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home uid={location.state.uid} />} />
        <Route path="Calendar" element={<BasicDateCalendar />} />
        <Route path="AddRemove" element={<AddRemove />} />
      </Routes>
    </div>
  );
}
