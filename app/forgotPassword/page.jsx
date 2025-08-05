"use client";
import React from "react";
import styled from "styled-components";

const ForgotPassword = () => {
  return (
    <StyledWrapper>
      <div className="form-container m-auto mt-10">
        <p className="title">Forgot Password</p>
        <form className="form">
          <div className="input-group">
            <label htmlFor="email">Enter your email</label>
            <input type="email" name="email" id="email" placeholder="example@example.com" />
          </div>
          <button className="sign">Reset Password</button>
        </form>
        <p className="signup">
          Remembered your password?{" "}
          <a rel="noopener noreferrer" href="/login">
            Sign in
          </a>
        </p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* same styles as Login component */
  .form-container {
    width: 320px;
    border-radius: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    padding: 2rem;
    color: rgba(243, 244, 246, 1);
  }

  .title {
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }

  .form {
    margin-top: 1.5rem;
  }

  .input-group {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .input-group label {
    display: block;
    color: rgba(156, 163, 175, 1);
    margin-bottom: 4px;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgba(55, 65, 81, 1);
    outline: 0;
    background-color: rgba(17, 24, 39, 1);
    padding: 0.75rem 1rem;
    color: rgba(243, 244, 246, 1);
  }

  .input-group input:focus {
    border-color: rgba(167, 139, 250);
  }

  .sign {
    display: block;
    width: 100%;
    background-color: rgba(167, 139, 250, 1);
    padding: 0.75rem;
    text-align: center;
    color: rgba(17, 24, 39, 1);
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    margin-top: 1rem;
  }

  .signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
    margin-top: 1rem;
  }

  .signup a {
    color: rgba(243, 244, 246, 1);
    text-decoration: none;
    font-size: 14px;
  }

  .signup a:hover {
    text-decoration: underline rgba(167, 139, 250, 1);
  }
`;

export default ForgotPassword;
