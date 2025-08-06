"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import styled from "styled-components";
import { resetConfirm } from '../utils/api';
import { setTokens } from '../../lib/auth';
import toast, { Toaster } from 'react-hot-toast';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // URL parametrlaridan email va tokenni olish
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    
    if (email && token) {
      setFormData(prev => ({
        ...prev,
        email: email,
        token: token
      }));
    } else {
      toast.error('Noto\'g\'ri reset link!');
      setTimeout(() => {
        router.push('/forgotPassword');
      }, 2000);
    }
  }, [searchParams, router]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error('Barcha maydonlar to\'ldirilishi shart!');
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error('Parol kamida 8 ta belgidan iborat bo\'lishi kerak!');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Parollar mos kelmaydi!');
      return;
    }

    setLoading(true);

    try {
      console.log('Reset confirm attempt with:', {
        email: formData.email,
        token: formData.token,
        newPassword: '***'
      });

      const result = await resetConfirm(formData.email, formData.token, formData.newPassword);
      
      if (result) {
        toast.success('Parol muvaffaqiyatli o\'zgartirildi!');
        
        // Agar tokenlar qaytarilsa, avtomatik login qilish
        if (result.access && result.refresh) {
          setTokens(result.access, result.refresh);
          setTimeout(() => {
            router.push('/home');
          }, 2000);
        } else {
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      } else {
        toast.error('Token eskirgan yoki noto\'g\'ri!');
      }
    } catch (error) {
      console.error('Reset confirm error:', error);
      toast.error('Parolni o\'zgartirishda xatolik yuz berdi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundBeamsWithCollision>
      <div className="min-h-screen flex items-center justify-center">
        <Toaster position="top-right" />
        <StyledWrapper>
          <div className="form-container m-auto mt-10 mb-10 border-1 border-gray-700 rounded-5">
            <p className="title">Reset Password</p>
            <p className="subtitle">Yangi parolni kiriting</p>
            
            {formData.email && (
              <div className="email-info">
                <p className="text-sm text-gray-400 text-center mb-4">
                  {formData.email} uchun parolni o'zgartirish
                </p>
              </div>
            )}

            <form className="form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="newPassword">Yangi Parol</label>
                <input 
                  type="password" 
                  name="newPassword" 
                  id="newPassword" 
                  placeholder="Yangi parolni kiriting..."
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={loading}
                  minLength={8}
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="confirmPassword">Parolni Tasdiqlash</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  id="confirmPassword" 
                  placeholder="Parolni qayta kiriting..."
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  minLength={8}
                />
              </div>

              <button 
                className="sign" 
                type="submit"
                disabled={loading || !formData.email || !formData.token}
              >
                {loading ? 'O\'zgartirilmoqda...' : 'Parolni O\'zgartirish'}
              </button>
            </form>

            <p className="signup">
              Remember your password?{" "}
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
  .form-container {
    width: 400px;
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

  .email-info {
    text-align: center;
    margin-bottom: 1rem;
  }

  .form {
    margin-top: 1.5rem;
  }

  .input-group {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-bottom: 1rem;
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

export default ResetPassword;
