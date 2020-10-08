import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';


function App() {
const [notifications, SetNotifications] = useState([]);
const [filterNotifications, SetFilterNotifications] = useState([]);

  useEffect(()=>{
   Axios.get('http://localhost:8080/notifications').then((data)=>{
     console.log('data', data.data);
     
    SetNotifications(data.data);
    SetFilterNotifications(data.data);
   });
  },[]);
  const handleNotificationFilter = (event)=>{
console.log(event.target.value);
const filteredData  = notifications.filter((ele)=>ele.severity===event.target.value);
SetFilterNotifications(filteredData);
  }
  const handleRemoveNotification = (id)=>{
    Axios.delete(`http://localhost:8080/notifications/${id}`).then((data)=>{
      const deletededData  = notifications.filter((ele)=>ele.id!==id);

     SetNotifications(deletededData);
     SetFilterNotifications(deletededData);
    })
  }
  return (
    <div className="App-container">
    <div>
      <select onChange={handleNotificationFilter}>
        <option>
          1
        </option>
        <option>
          2
        </option>
        <option>
          3
        </option>
      </select>
      <button>Add notification</button>
    </div>
{filterNotifications.map((ele)=>(
  <div className="App-notification">
      <span className="remove-notification" onClick={()=>handleRemoveNotification(ele.id)}>X</span>
    <h1>{ele.title}</h1>
    <p>{ele.description}</p>
  </div>
))}
    
    </div>
  );
}

export default App;
