import NavigationBar from "../components/navBar/NavigationBar";
import MainContent from './MainContent';

export default function Home() {
  return (
    <div className = "main">
      <NavigationBar />
      <MainContent />
    </div>
  );
}
