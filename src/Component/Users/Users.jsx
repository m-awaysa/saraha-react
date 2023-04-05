import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import paginate from '../../utils/paginate';
import Pagination from '../Pagination/Pagination';


function Users({ users }) {
  const [filter, setFilter] = useState(users);
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 12
  });

  const changePageNumber = (page) => {
    setPageInfo({ ...pageInfo, pageNumber: page })
  }

  const searchFilter = (event) => {
    const { value } = event.target;
    const arr = []
    users.map((user) => {
      if (user.userName.toLowerCase().includes(value.toLowerCase())) {
        arr.push(user)
      }
    })
    setFilter(arr);
    setPageInfo({ ...pageInfo, pageNumber: 0 })
  }

  return (
    <div className='container'>
      <div className="input-group mb-3">
        <input onChange={searchFilter}
          type="text" className="form-control" placeholder="Product's name" name='pname'
          aria-label="Product's name" aria-describedby="basic-addon2" />
        <span className="input-group-text" id="basic-addon2">search</span>
      </div>
      <table className="table  mt-5 border">
        <thead>
          <tr>
            <th scope="col ">#</th>
            <th scope="col ">Name</th>
            <th scope="col ">Contact</th>
          </tr>
        </thead>
        <tbody className='border '>
          {paginate(filter, pageInfo.pageNumber, pageInfo.pageSize).map((user, index) => {
            return <tr key={user._id}>
              <th scope="row">{index +(pageInfo.pageNumber * pageInfo.pageSize)}</th>
              <td>{user.userName}</td>
              <td><Link to={`/user/${user._id}`} className='btn btn-primary'>Send message <i className='fa-regular fa-paper-plane'></i></Link></td>
            </tr>
          })}

        </tbody>
      </table>
      <Pagination users={filter} changePageNumber={changePageNumber} {...pageInfo} />
    </div>
  )
}

export default Users