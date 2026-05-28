import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserById, getAllUsers } from '../service/api';

const UserList = () => {
    const[user, setUser]=useState([]);
    useEffect(()=>{
   fetchUsers()
    },[])
 const navigate = useNavigate()
    const fetchUsers=()=>{
        getAllUsers()
    .then(res => setUser(res.data))
    }

    const handledelete=(id)=>{
        deleteUserById(id) ;
        console.log("User deleted");
        fetchUsers();
    }
  return (
    <>
    <table>
        <thead><tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>City</th>
            <th>Action</th>
            </tr></thead>
          <tbody>
            {
                user.map(( item)=>(
                    <tr key ={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.city}</td>
                <td>
                    <button onClick={()=>navigate(`/update/${item.id}`)}>Update</button>
                    <button onClick={()=>handledelete(item.id)}>Delete</button>
                </td>
                    </tr>
                ))

            }
          </tbody>

    </table>
    </>
  )
}

export default UserList
