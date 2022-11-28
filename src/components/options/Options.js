import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message, Select } from "antd";
import Phone from "../../assests/phone.gif";
import Teams from "../../assests/teams.mp3";
import * as classes from "./Options.module.css";
import VideoContext from "../../context/VideoContext";
import Hang from "../../assests/hang.svg";
import {
  UserOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { socket } from "../../context/VideoState";
import axios from "axios";
import { useParams } from "react-router-dom"

const Options = () => {
  const [idToCall, setIdToCall] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);  
  const [doctorListData, setDoctorListData] = useState([])
  let { token } = useParams();

  const Audio = useRef();
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

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  const showModal = (showVal) => {
    setIsModalVisible(showVal);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else setIsModalVisible(false);
  }, [call.isReceivingCall]);

  const handleChange = (value, selectedData) => {
    console.log(value, selectedData.value)
    setName(selectedData.label);
    localStorage.setItem("name", selectedData.label);
    setIdToCall(selectedData.value)
  };


  const jsonDataTraversal = (jsonData) =>{
    setDoctorListData(jsonData?.data?.map((item)=> {
      return ({ label: item.User.fullName, value:item.callId, status:item.isBusy})
    })) 
  }

  useEffect(() => {
    axios.get('https://api.vetsoncall.in/api/call/doctor-list', {
      headers:{
        'accept': 'application/json' ,
        'Authorization': `Bearer ${token}`
      }
      }).then(response => jsonDataTraversal(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className={classes.options}>
      <div className={classes.share_options}>

        <Select
          defaultValue="lucy"
          style={{
            width: '100%',
          }}
          onChange={handleChange}
          options={doctorListData}
        />
        
      </div>
      <div >       

        {callAccepted && !callEnded ? (
          <Button
            variant="contained"
            onClick={leaveCall}
            className={classes.hang}
            tabIndex="0"
          >
            <img src={Hang} alt="hang up" style={{ height: "15px" }} />
            &nbsp; Hang up
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            onClick={() => {
              if (name.length) callUser(idToCall);
              else message.error("Please enter your name to call!");
            }}
            className={classes.btn}
            tabIndex="0"
          >
            Call
          </Button>
        )}
      </div>

      {call.isReceivingCall && !callAccepted && (
        <>
          <audio src={Teams} loop ref={Audio} />
          <Modal
            title="Incoming Call"
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
                {call.name} is calling you:{" "}
                <img
                  src={Phone}
                  alt="phone ringing"
                  className={classes.phone}
                  style={{ display: "inline-block" }}
                />
              </h1>
            </div>
            <div className={classes.btnDiv}>
              <Button
                variant="contained"
                className={classes.answer}
                color="#29bb89"
                icon={<PhoneOutlined />}
                onClick={() => {
                  answerCall();
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Answer
              </Button>
              <Button
                variant="contained"
                className={classes.decline}
                icon={<PhoneOutlined />}
                onClick={() => {
                  setIsModalVisible(false);
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Decline
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Options;
