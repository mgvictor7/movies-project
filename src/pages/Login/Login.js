import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import * as UserActions from '../../redux/user/actions';

import Loading from '../../components/Loading';

import './Login.scss';

export default function Login() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();
  const login = (params) => {
    dispatch(UserActions.login(params));
  }

  const handleChange = (event) => {
    setHasError(false);
    const key = event.target.id;
    const _text = event.target.value.trim();

    setFormData(prev => ({
      ...prev,
      [key]: _text,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const params = {
      ...formData,
      callbackOK: () => {
        setIsLoading(false);
        navigate('/', { replace: true });
      },
      callbackERROR: () => {
        setIsLoading(false);
        setHasError(true);
      }
    };

    login(params);
  }

  return (
    <div className='login'>
  
      {isLoading && <Loading center />}

      <div className='login-box'>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='login-form-title'>
            <span>Sign in</span>
          </div>

          <div className='login-input-content'>

            <div className='input-wrapper'>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Email'
                onChange={handleChange}
                required
              />

            </div>
            <div className='input-wrapper'>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Password'
                onChange={handleChange}
                required
              />
            </div>

            <div className='submit-form-bnt-wrapper'>
              <button className='submit-form-bnt' type='submit'>
                Sing In
              </button>
            </div>

            {hasError &&
              <div className='login-error'>
                <span>Wrong email or password</span>
              </div>
            }

          </div>
        </form>
      </div>
    </div>
  );
}