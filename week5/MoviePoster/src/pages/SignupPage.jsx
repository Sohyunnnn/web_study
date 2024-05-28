import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 300px;
  height: 35px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > form > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Button = styled.button`
  width: 300px;
  height: 35px;
  margin-bottom: 10px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007BFF')};
  color: ${(props) => (props.disabled ? '#666' : '#fff')};
  border: none;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0 7px 0;
  font-size: 12px;
`;

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateName = (name) => {
    return /^[가-힣A-Za-z\s]+$/.test(name);
  };

  useEffect(() => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (!validateName(name)) {
      newErrors.name = 'Name must be a string';
    }

    if (!email) newErrors.email = 'Email is required';
    if (!age) newErrors.age = 'Age is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required';

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
  }, [name, email, age, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted');
    }
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  return (
    <main>
      <Container>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder='Please enter your name'
            value={name}
            onChange={handleInputChange(setName, 'name')}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          <Input
            placeholder='Please enter your email'
            value={email}
            onChange={handleInputChange(setEmail, 'email')}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Input
            placeholder='Please enter your age'
            value={age}
            onChange={handleInputChange(setAge, 'age')}
          />
          {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
          <Input
            placeholder='Please enter your password'
            type='password'
            value={password}
            onChange={handleInputChange(setPassword, 'password')}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Input
            placeholder='Check password'
            type='password'
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword, 'confirmPassword')}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          <Button type='submit'>Submit</Button>
        </form>
        <div>
          <p>Do you already have an ID?</p>
          <p>Go to the login page</p>
        </div>
      </Container>
    </main>
  );
};

export default SignupPage;
