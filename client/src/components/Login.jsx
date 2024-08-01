import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@lnmiit\.ac\.in$/;

    if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Only institute emails ending with @lnmiit.ac.in are acceptable';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('/api/auth/login', formData);
        setMessage(response.data.message);
        if (response.status === 200) {
          navigate('/project');
        }
      } catch (error) {
        setMessage(error.response ? error.response.data.message : 'An error occurred');
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading>Login</Heading>
      <Input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
        required 
      />
      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      <Input 
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        placeholder="Password" 
        required 
      />
      {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      <ButtonContainer>
        <Button type="submit">Login</Button>
      </ButtonContainer>
      {message && <Message>{message}</Message>}
    </form>
  );
};

const Heading = styled.h1`
  color: black;
  text-align: center;
  font-size: 3.5em;
  font-weight: bolder;
  margin-top: 50px;
`;

const Input = styled.input`
  display: block;
  width: 300px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border: none;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Message = styled.p`
  color: green;
  text-align: center;
`;

export default Login;
