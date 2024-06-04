import { useState } from 'react';
import styled from 'styled-components';
import { postLogin } from '../api/postLogin';
import { useNavigate } from 'react-router-dom';

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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0 7px 0;
  font-size: 12px;
  text-align: center;
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

  const navigate = useNavigate();


  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    validateForm(); // 입력값이 변경될 때마다 검증 함수 호출
    
    if (field === 'password') {
      validatePassword(e.target.value);
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    
    if (isFormValid) {
      (async () => {
      try {
        const userData = { username: id, password }; // Prepare user data
        const response = await postLogin(userData); // Call postLogin function
        // Handle the response according to your requirements
        console.log(response); // Log the response
        if(response.token){
          localStorage.setItem('token',response.token)
          alert('Login successful!');
        }
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.error('Error logging in:', error);
        // Handle error
      }
    })();
  }
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (typeof password !== 'string') return 'Password must be a string';
    if (password.length < 4) return 'Password must be at least 4 characters long';
    if (password.length > 12) return 'Password must be no more than 12 characters long';
    // const hasLetter = /[a-zA-Z]/.test(password);
    // const hasNumber = /[0-9]/.test(password);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    // if (!hasLetter || !hasNumber || !hasSpecialChar) return 'Password must include letters, numbers, and special characters';
    return '';
  };

  // 검증 함수
  const validateForm = () => {
    const newErrors = {};
    if (!id) newErrors.id = 'Please enter your id';

    // 패스워드 필드 검증
  const passwordError = validatePassword(password);
  if (passwordError) {
    newErrors.password = passwordError;
  }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };



  return (
    <main>
      <Container>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
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
        </Form>
      </Container>
    </main>
  )
}

export default LoginPage