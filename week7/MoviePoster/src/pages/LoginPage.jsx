import { useState } from 'react';
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

const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0 7px 0;
  font-size: 12px;
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

const LoginPage = () => {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    validateForm(); // 입력값이 변경될 때마다 검증 함수 호출
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    // Add your login logic here
  };

  // 검증 함수
  const validateForm = () => {
    const newErrors = {};
    if (!id) newErrors.id = 'Please enter your id';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (typeof password !== 'string') {
      newErrors.password = 'Password must be a string';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    } else if (password.length > 12) {
      newErrors.password = 'Password must be no more than 12 characters long';
    } else {
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (!hasLetter || !hasNumber || !hasSpecialChar) {
        newErrors.password = 'Password must include letters, numbers, and special characters';
      }
    }
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };



  return (
    <main>
      <Container>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <Input
            placeholder='Please enter your id'
            value={id}
            onChange={handleInputChange(setId, 'id')}
          />
          {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}
          <Input
            placeholder='Please enter your password'
            type='password'
            value={password}
            onChange={handleInputChange(setPassword, 'password')}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Button type='submit' disabled={!isFormValid} onClick={validateForm}>Login</Button>
        </form>
      </Container>
    </main>
  )
}

export default LoginPage