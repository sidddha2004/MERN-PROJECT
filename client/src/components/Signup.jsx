import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    typeOfUser: 'Student',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@lnmiit\.ac\.in$/;

    if (!formData.name) {
      formErrors.name = 'Name is required';
    }

    if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Only institute emails ending with @lnmiit.ac.in are acceptable';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long';
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post('/api/auth/signup', formData);
        setMessage(response.data.message);
        if (response.status === 201) {
          navigate('/Project');
        }
      } catch (error) {
        setMessage(error.response ? error.response.data.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Heading>Signup</Heading>
        <Input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required 
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
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
        <Input 
          type="password" 
          name="confirmPassword" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          placeholder="Confirm Password" 
          required 
        />
        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        <Select 
          name="typeOfUser" 
          value={formData.typeOfUser} 
          onChange={handleChange}
        >
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </Select>
        <ButtonContainer>
          <Button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </Button>
        </ButtonContainer>
        {message && <Message>{message}</Message>}
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  color: black;
  text-align: center;
  font-size: 3.5em;
  font-weight: bolder;
  margin-top: 50px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border: none;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Message = styled.p`
  color: green;
  text-align: center;
`;

export default Signup;
