import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import findUSer from '../../utils/findUser';
import axios from 'axios';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard'

const MyProfile = ({ users, user }) => {
  const [profileUser, setProfileUser] = useState({});
  const [messages, setMessages] = useState([]);

  const getUser = () => {
    const decoded = jwtDecode(user)
    setProfileUser(findUSer(users, decoded.id))
  }

  const deleteMessage = async (id) => {
    try {
      const tokenAPI = `tariq__${user}`
      await axios.delete(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`, { headers: { token: tokenAPI } });
      getMessages();
      toast.success('deleted Successfully!');
    } catch (error) {
      toast.warning('error acquired');
    }
  }
  const getMessages = async () => {
    try {
      const tokenAPI = `tariq__${user}`
      const result = await axios.get('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages', { headers: { token: tokenAPI } });
      if (result.data.message === 'success') {
        setMessages(result.data.messages)
      }
    } catch (error) {
      setMessages({})
    }
  }

  const shareProfile = (event, url) => {
    event.preventDefault();
    copy(url);
  }

  useEffect(() => {
    getUser()
    getMessages()
  },[]);
  return (<>
    <div>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <a href data-toggle="modal" data-target="#profile">
            <img src="image/avatar.png" className="avatar " alt='...' />
          </a>
          <h3 className="py-2">{profileUser.userName}</h3>
          <button data-toggle="modal" data-target="#share"
            className="btn btn-default-outline share "
            onClick={(e) => shareProfile(e, `http://localhost:3000/user/${profileUser._id}`)}>
            <i className="fas fa-share-alt" />  Share Profile</button>
        </div>
      </div>
      {messages.length === 0 ? <div className="container text-center my-5 text-center">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-5">
              <p>You don't have any messages... </p>
            </div>
          </div>
        </div>
      </div>
        : messages.map((message, index) => {
          return <div className="container text-center my-3 position-relative border" id={`message${index}`}>
            <div className="row">
              <div className="col-md-12 ">
                <div className="py-3 ">
                  <p>{message.text}</p>
                  <button onClick={() => deleteMessage(message._id)} className='btn btn-danger'>
                    <i className='fa-solid fa-trash fs-4'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        })}

    </div>
  </>)
};


export default MyProfile;