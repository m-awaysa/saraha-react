import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import findUSer from '../../utils/findUser';

const UserProfile = ({users}) => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [error, setError] = useState([]);
    const [user] = useState(findUSer(users,id));

    const onChange = (event) => {
        const { value } = event.target
        setMessage(value)
    }

    const submitForm = async (event) => {
        event.preventDefault()
        try {
            let { data } = await axios.post(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`, { message })
            if (data.message === 'success') {
                setError([])
                toast.success('The message has been sent successfully!');
            } else if (data.message === 'validation error') {
                setError(data.err[0])

            }
        } catch (error) {

        }

    }

    return (
        <>
            <div className="container text-center py-5 my-5 text-center">
                <div className="card py-5 mb-5">
                    <a href data-toggle="modal" data-target="#profile">
                        <img src="/image/avatar.png" className="avatar " alt='...' />
                    </a>
                    <h3 className="py-2">{user.userName}</h3>
                    <div className="container w-50 m-auto">
                        <form onSubmit={submitForm}>
                            {error.map((err) => <div className='text-danger'>{err.message}</div>)}
                            <textarea onChange={onChange} value={message} className="form-control" name id cols={10} rows={9} placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)" defaultValue={""} />
                            <button className="btn btn-outline-info mt-3"><i className="far fa-paper-plane" /> Send</button>
                        </form>
                    </div>
                </div>
                <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
            </div>
        </>
    );
}

export default UserProfile;
