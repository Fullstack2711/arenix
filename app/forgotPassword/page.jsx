"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import styled from "styled-components";
import { resetPassword } from '../utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Email manzilni kiriting!');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Email manzil noto\'g\'ri formatda!');
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(email);
      
      if (result) {
        toast.success('Parolni tiklash havolasi emailingizga yuborildi!');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        toast.error('Email manzil topilmadi yoki xatolik yuz berdi!');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Parolni tiklash jarayonida xatolik yuz berdi!');
    } finally {
      setLoading(false);
    }
  };

  return (
     <BackgroundBeamsWithCollision>
          <div className="min-h-screen   to-gray-800 flex items-center justify-center">
      <Toaster position="top-right" />
      <StyledWrapper>
        <div className="form-container m-auto mt-10 mb-10 border-1 border-gray-700 rounded-5">
          <p className="title">Forgot Password</p>
          <p className="subtitle">Parolni tiklash uchun email manzilni kiriting</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Enter your email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Email manzilni kiriting..."
                value={email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <button 
              className="sign" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Yuborilmoqda...' : 'Reset Password'}
            </button>
          </form>
          <p className="signup">
            Remembered your password?{" "}
            <a rel="noopener noreferrer" href="/login">
              Sign in
            </a>
          </p>
        </div>
      </StyledWrapper>
    </div>
    </BackgroundBeamsWithCollision>

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

  .subtitle {
    text-align: center;
    font-size: 0.875rem;
    color: rgba(156, 163, 175, 1);
    margin-top: 0.5rem;
    margin-bottom: 1rem;
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

  .input-group input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .sign:hover:not(:disabled) {
    background-color: rgba(147, 119, 240, 1);
  }

  .sign:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
