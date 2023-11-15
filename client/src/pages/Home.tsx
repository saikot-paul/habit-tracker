import NavigationBar from "../components/navBar/NavigationBar";
import MainContent from './MainContent';
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  return (
    <div className="main">
      <NavigationBar />
      <MainContent uid={location.state.uid} />
    </div>
  );
}
