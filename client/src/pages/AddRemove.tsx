import Typography from '@mui/material/Typography';
import NavigationBar from '../components/navBar/NavigationBar';

export default function AddRemove() {
    return (
      <div>
        <NavigationBar></NavigationBar>
        <Typography sx={{ typography: "title1" }}>
          Add or Remove Item
        </Typography>
      </div>
    );
}