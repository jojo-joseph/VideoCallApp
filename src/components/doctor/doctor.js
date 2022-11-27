import React, { useEffect, useContext } from "react";
import VideoContext from "../../context/VideoContext";
import axios from "axios";

const Doctor = () => {

  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    otherUser,
    setOtherUser,
    leaveCall1,
  } = useContext(VideoContext);
  console.log(me)
  
  useEffect(() => {
    if(me){
      const paramsOne = { callId: me };
      axios.put('https://api.vetsoncall.in/api/call/update-call-id', paramsOne, {
        headers:{
          'accept': 'application/json' ,
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5ZjZiMjMwLWYxOTEtNDgxMy04NmJhLWEyZjM5ZjJhY2E3ZCIsImlhdCI6MTY2OTUxNzc3MiwiZXhwIjoyMTg3OTE3NzcyfQ.PTVewGL5ziA13_UE-ChQBx-DFpEJ3tU_WEIk-_BBAJw'
        }
        }).then(response => console.log(response.data))
        .catch(error => console.log(error));

        const paramsTwo = { isAvailable: true };
        axios.put('https://api.vetsoncall.in/api/call/update-availability', paramsTwo, {
        headers:{
          'accept': 'application/json' ,
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5ZjZiMjMwLWYxOTEtNDgxMy04NmJhLWEyZjM5ZjJhY2E3ZCIsImlhdCI6MTY2OTUxNzc3MiwiZXhwIjoyMTg3OTE3NzcyfQ.PTVewGL5ziA13_UE-ChQBx-DFpEJ3tU_WEIk-_BBAJw'
        }
        }).then(response => console.log(response.data))
        .catch(error => console.log(error));
      }else{
        console.log('callid is not updated')
      }
    }, [me]);   
    

  return (
    <div>
        Doctor
    </div>
  );
};

export default Doctor;
