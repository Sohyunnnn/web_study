import { useState, useEffect,  } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { postSignup } from '../api/postSignup';

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

const Text = styled.p`
  font-weight: 800;
  text-decoration: underline;
  cursor:pointer;
  margin-bottom: 70px;
`;

const SignupPage = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  
  const validateName = (name) => {
    return /^[가-힣A-Za-z\s]+$/.test(name);
  };

  const validateId = (id) => {
    return /^[A-Za-z0-9]+$/.test(id);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateAge = (age) => {
    if (!age) {
      return 'Age is required';
    }
    const ageNumber = Number(age);
    if (isNaN(ageNumber)) {
      return 'Age must be a number';
    }
    if (ageNumber < 0) {
      return 'Age cannot be negative';
    }
    if (!Number.isInteger(ageNumber)) {
      return 'Age cannot be a decimal';
    }
    if (ageNumber < 19) {
      return 'You must be at least 19 years old';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (typeof password !== 'string') return 'Password must be a string';
    if (password.length < 4) return 'Password must be at least 4 characters long';
    if (password.length > 12) return 'Password must be no more than 12 characters long';
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasLetter || !hasNumber || !hasSpecialChar) return 'Password must include letters, numbers, and special characters';
    return '';
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) return 'Confirm password is required';
    if (typeof confirmPassword !== 'string') return 'Confirm password must be a string';
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleClick= ()=>{
    navigate('/login')
  }

  useEffect(() => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (!validateName(name)) {
      newErrors.name = 'Name must be a string';
    }

    if (!id) {
      newErrors.id = 'ID is required';
    } else if (!validateId(id)) {
      newErrors.id = 'ID must be alphanumeric';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    const ageError = validateAge(age);
    if (ageError) {
      newErrors.age = ageError;
    }


    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
  }, [name, id, email, age, password, confirmPassword]);

  // const FormData = {
  //   name: name,
  //   id: id,
  //   email: email,
  //   age: age,
  //   password: password, 
  //   confirmPassword: confirmPassword
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      (async () => {
      try {
        const userData = { name, id, email, age, password, confirmPassword };
        const response = await postSignup(userData);
        // 여기서 응답을 처리합니다. 예를 들어, 응답이 성공적으로 수행되면 사용자를 로그인 페이지로 리다이렉트할 수 있습니다.
        if (response.success) {
          alert('회원가입이 성공적으로 완료되었습니다!');
          navigate('/login');
        } else {
          // 실패한 경우 에러 메시지를 출력합니다.
          alert(response.message);
        }
      } catch (error) {
        console.error('Error signing up:', error);
        // API 호출이 실패한 경우 에러 메시지를 출력합니다.
        alert('회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    })();
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
            placeholder='Please enter your id'
            value={name}
            onChange={handleInputChange(setId, 'id')}
          />
          {errors.name && <ErrorMessage>{errors.id}</ErrorMessage>}
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
          <Button type='submit' disabled={!isFormValid}>Submit</Button>
        </form>
        <div>
          <p>Do you already have an ID?</p>
          <Text onClick={handleClick}>Go to the login page</Text>
        </div>
      </Container>
    </main>
  );
};

export default SignupPage;
