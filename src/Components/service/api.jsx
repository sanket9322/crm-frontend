import axios from 'axios';
const base_Url ="http://localhost:8080/api/users" ;

export const addUser=async(users)=> await  axios.post(base_Url , users)
export const getAllUsers=async()=> await axios.get(base_Url);
export const getUserById=async(id)=> await axios.get(`${base_Url}/${id}`)
export const deleteUserById = async(id)=> await axios.delete(`${base_Url}/${id}`)
export const updateUser =async(id, users)=> await axios.put(`${base_Url}/${id}` , users)



export const addCustomer=async(customers)=> await axios.post(base_Url , customers)
export const getAllCustomers=async()=> await axios.get(base_Url)
export const getCustomerById=async(id)=> await axios.get(`${base_Url}/${id}`)
export const updateCustomer =async(id, customers)=>  await axios.put(`${base_Url}/${id}` , customers)
export const deleteCustomer = async(id)=>await axios.delete(`${base_Url}/${id}`);


const Base_URLLead =" ";
export const getAlllead=async()=> await axios.get(Base_URLLead);
export const createLead=async(leads)=> await axios.post(Base_URLLead , leads)
export const deleteLead=async(id)=> await axios.delete(`${Base_URLLead}/${id}`)
export const updateLead=async(id, leads)=>await axios.put(`${Base_URLLead}/${id}`, leads)
