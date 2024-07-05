  import ReactDOM from 'react-dom/client';
  import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  import store from './redux/store'
  import { Provider } from 'react-redux';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <Provider store={store}>
    <App />
  </Provider>
  );

  reportWebVitals();

  // index.js에 store를 연결

  // import 마지막 두줄을 잘 확인하자 store 와 Provider
  // Provider가 App을 감싸고 있고 store라는 파라미터를 전달
  // 설정을 안해주면 하위 컴포넌트에 상태값이 전달되지 않음.