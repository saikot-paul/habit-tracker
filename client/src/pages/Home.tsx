import BasicDateCalender from '../components/calender/BasicDateCalender'
import NavigationBar from "../components/navBar/NavigationBar";

export default function Home() {
  return (
    <div className = "main">
      <NavigationBar />
      <BasicDateCalender />
    </div>
  );
}
