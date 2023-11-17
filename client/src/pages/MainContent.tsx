import BasicDateCalendar from "../components/calender/BasicDateCalender";
import NavigationBar from "../components/navBar/NavigationBar";
import AddRemove from "./AddRemove";
import Home from './Home';
import { Route, Routes, Router } from "react-router-dom";

export default function MainContent() {
  return (
    <div className = "main-content">
      <NavigationBar />
      
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="Calendar" element={<BasicDateCalendar/>}/>
          <Route path="AddRemove" element={<AddRemove/>}/>
        </Routes>
      
      
    </div>
  );
}
