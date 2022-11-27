import { useEffect, useState } from "react";
import Video from "./components/Video/Video";
import VideoState from "./context/VideoState";
import axios from "axios";
import Options from "./components/options/Options";
import Doctor from "./components/doctor/doctor";
const Home = () => {
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, [navigator]);
 
 useEffect(()=>{
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
      axios.get('https://api.vetsoncall.in/api/user/permissions', {
      headers:{
        'accept': 'application/json' ,
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5ZjZiMjMwLWYxOTEtNDgxMy04NmJhLWEyZjM5ZjJhY2E3ZCIsImlhdCI6MTY2OTUxNzc3MiwiZXhwIjoyMTg3OTE3NzcyfQ.PTVewGL5ziA13_UE-ChQBx-DFpEJ3tU_WEIk-_BBAJw'
      }
      }).then(response => setUserRole(response.data))
      .catch(error => console.log(error));
      console.log('qqqqqqqqqq',userRole)
 }, [])

  return (
    <VideoState>
      <div className="App" style={{ height: "100%", width: "100%" }}>
        <Video />
        {userRole && (userRole[0] === 'DOCTOR' ? 
          <Options /> : <Doctor />)
        }
       
      </div>
    </VideoState>
  );
};

export default Home;
