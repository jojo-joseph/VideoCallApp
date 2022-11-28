import React, { useEffect, useContext } from "react";
import VideoContext from "../../context/VideoContext";
import axios from "axios";
import { useParams } from "react-router-dom"

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
  let { token } = useParams();
  useEffect(() => {
    if(me){
      const paramsOne = { callId: me };
      axios.put('https://api.vetsoncall.in/api/call/update-call-id', paramsOne, {
        headers:{
          'accept': 'application/json' ,
          'Authorization':`Bearer ${token}`
      }
        }).then(response => console.log(response.data,'success'))
        .catch(error => console.log(error));

        const paramsTwo = { isAvailable: true };
        axios.put('https://api.vetsoncall.in/api/call/update-availability', paramsTwo, {
        headers:{
          'accept': 'application/json' ,
          'Authorization': `Bearer ${token}`
       }
        }).then(response => console.log(response.data,'success'))
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
