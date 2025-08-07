"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { login, verify } from '../utils/api';
import { initiateSteamLogin } from '../utils/steam';
import { setTokens } from '../../lib/auth';
import toast, { Toaster } from 'react-hot-toast';
 import { SimpleOTPInput } from '../components/SimpleOTPInput';
import { BackgroundBeamsWithCollision } from '../../components/ui/background-beams-with-collision';
import Image from 'next/image';
const Form = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [otpData, setOtpData] = useState({
    email: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: login form, 2: OTP form

  const handleChange = (e) => {
    if (step === 1) {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
  };

  const handleOtpChange = (value) => {
    console.log('OTP value changed:', value, 'Length:', value?.length);
    setOtpData(prev => ({
      ...prev,
      otp: value
    }));
  };

  const handleSteamLogin = async () => {
    try {
      setLoading(true);
      toast.loading('Steam sahifasiga yo\'naltirilmoqda...', { id: 'steam-loading' });
      await initiateSteamLogin();
    } catch (error) {
      console.error('Steam login error:', error);
      toast.dismiss('steam-loading');
      toast.error('Steam login da xatolik yuz berdi!');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      // Birinchi bosqich: Email va parol yuborish
      if (!formData.email || !formData.password) {
        toast.error('Email va parol kiritilishi shart!');
        return;
      }

      setLoading(true);

      try {
        console.log('Login attempt with:', { email: formData.email, password: '***' });
        const result = await login(formData.email, formData.password);
        
        console.log('Login result received:', result);
        
        if (result && result.message && (result.message.includes('Verification') || result.message.includes('code'))) {
          // OTP yuborildi
          setOtpData(prev => ({ ...prev, email: formData.email }));
          setStep(2);
          toast.success('Tasdiqlash kodi emailingizga yuborildi!');
        } else if (result && result.access && result.refresh) {
          // To'g'ridan-to'g'ri tokenlar keldi
          setTokens(result.access, result.refresh);
          toast.success('Muvaffaqiyatli login qildingiz!');
          setTimeout(() => {
            router.push('/user-dashboard');
          }, 1000);
        } else if (result === null) {
          toast.error('Server bilan bog\'lanishda xatolik!');
        } else {
          toast.error('Email yoki parol noto\'g\'ri!');
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error('Login jarayonida xatolik yuz berdi!');
      } finally {
        setLoading(false);
      }
    } else {
      // Ikkinchi bosqich: OTP tasdiqlash
      console.log('=== OTP VALIDATION DEBUG ===');
      console.log('otpData.otp:', otpData.otp);
      console.log('otpData.otp type:', typeof otpData.otp);
      console.log('otpData.otp length:', otpData.otp?.length);
      console.log('String(otpData.otp):', String(otpData.otp));
      console.log('String(otpData.otp).length:', String(otpData.otp).length);
      console.log('=== END DEBUG ===');
      
      const otpString = String(otpData.otp || '');
      
      if (!otpData.otp || otpString.length !== 4) {
        console.log('Validation failed - OTP length:', otpString.length);
        toast.error('4 raqamli OTP kodi kiritilishi shart!');
        return;
      }

      setLoading(true);

      try {
        console.log('OTP verification with:', { email: otpData.email, otp: otpData.otp });
        const result = await verify(otpData.email, otpData.otp);
        
        console.log('OTP verification result:', result);
        
        if (result && result.access && result.refresh) {
          setTokens(result.access, result.refresh);
          toast.success('Muvaffaqiyatli tasdiqlandi!');
          setTimeout(() => {
            router.push('/user-dashboard');
          }, 1000);
        } else if (result === null) {
          toast.error('Server bilan bog\'lanishda xatolik!');
        } else {
          toast.error('OTP kodi noto\'g\'ri yoki eskirgan!');
        }
      } catch (error) {
        console.error('OTP verification error:', error);
        if (error.message.includes('Invalid or expired')) {
          toast.error('OTP kodi noto\'g\'ri yoki eskirgan!');
        } else {
          toast.error('OTP tasdiqlashda xatolik yuz berdi!');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <BackgroundBeamsWithCollision>
    <div className="flex items-center justify-center   p-6  ">
      <Toaster position="top-right" />
      <StyledWrapper>
        <div className={`form-container ${step === 2 ? 'otp-form' : ''} m-auto mt-10 mb-10 border-1 border-gray-700 rounded-5`}>
          <p className="title">{step === 1 ? 'Login' : 'OTP Tasdiqlash'}</p>
          <form className="form" onSubmit={handleSubmit}>
            {step === 1 ? (
              // Birinchi bosqich: Email va Parol
              <>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    placeholder="Email kiriting..."
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Parol kiriting..."
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <div className="forgot">
                    <a rel="noopener noreferrer" href="/forgotPassword">Forgot Password ?</a>
                  </div>
                </div>
                <button 
                  className="sign" 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? 'Tekshirilmoqda...' : 'Tekshirish'}
                </button>
              </>
            ) : (
              // Ikkinchi bosqich: OTP
              <>
                <div className="otp-container">
                  <SimpleOTPInput 
                    value={otpData.otp}
                    onChange={handleOtpChange}
                    disabled={loading}
                  />
                  <div className="email-info">
                    <p className="text-sm text-gray-400 mt-4 text-center">
                      {otpData.email} manziliga tasdiqlash kodi yuborildi
                    </p>
                  </div>
                </div>
                <button 
                  className="sign" 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? 'Tasdiqlanmoqda...' : `Tasdiqlash ${otpData.otp ? `(${String(otpData.otp).length}/4)` : '(0/4)'}`}
                </button>
                <button 
                  className="back-btn" 
                  type="button" 
                  onClick={() => {
                    setStep(1);
                    setOtpData({ email: '', otp: '' });
                  }}
                  disabled={loading}
                >
                  Orqaga qaytish
                </button>
              </>
            )}
          </form>
        {step === 1 && (
          <>
        <div className="social-message">
          <div className="line" />
          <p className="message">Login with social accounts</p>
          <div className="line" />
        </div>
        <div className="social-buttons">
          <button 
            className="social-btn google-btn" 
            type="button"
            aria-label="Log in with Google"
          >
             <Image src="/logo/google.png" alt="Google" width={30} height={20} />
            <span>Google  </span>
          </button>
          
          <button 
            className="social-btn steam-btn" 
            type="button"
            onClick={handleSteamLogin}
            disabled={loading}
            aria-label="Log in with Steam"
          >
              <Image src="/logo/steam.png" alt="Steam" width={30} height={20} />
            <span>{loading ? 'Yuklanmoqda...' : 'Steam'}</span>
          </button>
        </div>

        <p className="signup  pt-4">Don't have an account?
          <a rel="noopener noreferrer" href="/register">Sign up</a>
        </p>
          </>
        )}
      </div>
    </StyledWrapper>
    </div>
    </BackgroundBeamsWithCollision>
  );
}

const StyledWrapper = styled.div`
  .form-container {
    width: 320px;
    border-radius: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    padding: 2rem;
    color: rgba(243, 244, 246, 1);
    transition: width 0.3s ease;
  }

  .form-container.otp-form {
    width: 400px;
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

  .forgot {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175,1);
    margin: 8px 0 14px 0;
  }

  .forgot a,.signup a {
    color: rgba(243, 244, 246, 1);
    text-decoration: none;
    font-size: 14px;
  }

  .forgot a:hover, .signup a:hover {
    text-decoration: underline rgba(167, 139, 250, 1);
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
    margin-bottom: 0.5rem;
    transition: background-color 0.2s ease;
  }

  .sign:disabled {
    background-color: rgba(107, 114, 128, 1);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .back-btn {
    display: block;
    width: 100%;
    background-color: transparent;
    padding: 0.75rem;
    text-align: center;
    color: rgba(156, 163, 175, 1);
    border: 1px solid rgba(55, 65, 81, 1);
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
  }

  .back-btn:hover {
    background-color: rgba(55, 65, 81, 1);
    color: rgba(243, 244, 246, 1);
  }

  .otp-container {
    margin: 1rem 0;
  }

  .email-info {
    text-align: center;
  }

  .email-info p {
    color: rgba(156, 163, 175, 1);
    font-size: 0.875rem;
    margin-top: 1rem;
  }

  .social-message {
    display: flex;
    align-items: center;
    padding-top: 1rem;
  }

  .line {
    height: 1px;
    flex: 1 1 0%;
    background-color: rgba(55, 65, 81, 1);
  }

  .social-message .message {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgba(156, 163, 175, 1);
  }

  .social-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid rgba(55, 65, 81, 1);
    border-radius: 0.375rem;
    background-color: transparent;
    color: rgba(243, 244, 246, 1);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .social-btn:hover {
    background-color: rgba(55, 65, 81, 1);
    border-color: rgba(75, 85, 99, 1);
    transform: translateY(-1px);
  }

  .social-btn:active {
    transform: translateY(0);
  }

  .social-icon {
    width: 1.25rem;
    height: 1.25rem;
    fill: currentColor;
  }

  .google-btn:hover {
    border-color: rgba(66, 133, 244, 0.5);
    background-color: rgba(66, 133, 244, 0.1);
  }

  .steam-btn:hover {
    border-color: rgba(23, 26, 32, 0.8);
    background-color: rgba(23, 26, 32, 0.2);
  }

  .social-icons {
    display: flex;
    justify-content: center;
  }

  .social-icons .icon {
    border-radius: 0.125rem;
    padding: 0.75rem;
    border: none;
    background-color: transparent;
    margin-left: 8px;
    cursor: pointer;
  }

  .social-icons .icon svg {
    height: 1.25rem;
    width: 1.25rem;
    fill: #fff;
  }

  .signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
  }`;

export default Form;
