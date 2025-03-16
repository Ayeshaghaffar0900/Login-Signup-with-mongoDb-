import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
const Signup = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

//   const handleChange = (e) => {
//     // setFormData({ ...formData, [e.target.name]: e.target.value });
//     setName(e.target.value)
//     setEmail(e.target.value)
//     setPassword(e.target.value)
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up...", name, email, password);
    axios.post('http://localhost:5000/signup', {name, email, password})
    .then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    }
    )
  };

  return (
    <div className="form-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
