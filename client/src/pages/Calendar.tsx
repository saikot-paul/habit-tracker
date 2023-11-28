import BasicDateCalendar from "../components/calender/BasicDateCalender";
import * as React from 'react';
import NavigationBar from '../components/navBar/NavigationBar';


export default function Calendar() {
    return ( 
        <div>
            <NavigationBar />
            <BasicDateCalendar/>
        </div>
     );
}
