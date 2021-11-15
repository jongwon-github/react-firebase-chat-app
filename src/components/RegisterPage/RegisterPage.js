import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function RegisterPage() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef();
  password.current = watch('password');

  console.log(watch('email'));

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>Register</h3>
      </div>
      <form>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register('email', { required: true, pattern: /^S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}
        <label>Name</label>
        <input
          name="name"
          {...register('name', { required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === 'required' && (
          <p>This name field is required</p>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <p>Your input exceed maximum length</p>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register('name', { required: true, minLength: 6 })}
          ref={password}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>This password field is required</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p>Password must have at least 6 characters</p>
        )}
        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          {...register('name', {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === 'required' && (
            <p>This password_confirm field is required</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === 'validate' && (
            <p>The password do not match</p>
          )}
        <input type="submit" />
        <Link style={{ color: 'gray', textDecoration: 'none' }} to="/login">
          이미 아디디가 있다면...
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;