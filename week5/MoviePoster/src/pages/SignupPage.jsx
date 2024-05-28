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

  useEffect(() => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (!validateName(name)) {
      newErrors.name = 'Name must be a string';
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
  }, [name, email, age, password, confirmPassword]);

  const FormData = {
    name: name,
    email: email,
    age: age,
    password: password, 
    confirmPassword: confirmPassword
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted');
      console.log(FormData);

      alert('회원가입이 성공적으로 완료되었습니다!');
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
