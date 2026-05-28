import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail, MdLocationCity } from "react-icons/md";
import { TbPasswordMobilePhone } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../service/api";

const UpdateUsers = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    city: "",
    password: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUsers();
  }, [id]);

  const loadUsers = async () => {
    const res = await getUserById(id);
    setUser(res.data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser(id, user);
    alert("User updated successfully!");
    navigate("/userlist");   // redirect to list page
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <h2>Update Here!</h2>

        <FaUsers />:
        <input 
          type="text"
          placeholder="enter name here"
          value={user.name}
          name="name"
          onChange={handleChange}
          required
        />
        <br />

        <MdEmail />:
        <input
          type="email"
          placeholder="enter email here"
          value={user.email}
          name="email"
          onChange={handleChange}
          required
        />
        <br />

        <FaPhone />:
        <input
          type="text"
          placeholder="enter phone here"
          name="contact"
          value={user.contact}
          onChange={handleChange}
          required
        />
        <br />

        <MdLocationCity />:
        <input
          type="text"
          placeholder="enter city here"
          name="city"
          value={user.city}
          onChange={handleChange}
          required
        />
        <br />

        <TbPasswordMobilePhone />:
        <input
          type="password"
          placeholder="enter password here"
          value={user.password}
          name="password"
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/userlist")}>Cancel</button>
      </form>
    </>
  );
}
export default UpdateUsers;
