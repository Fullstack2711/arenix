import { useState, useEffect } from 'react';

export const SimpleOTPInput = ({ value, onChange, disabled }) => {
    const [otp, setOtp] = useState(['', '', '', '']);

    // Initialize from value prop
    useEffect(() => {
        if (value) {
            const digits = String(value).split('').slice(0, 4);
            const newOtp = [...digits, ...Array(4 - digits.length).fill('')];
            setOtp(newOtp);
        }
    }, [value]);

    const handleChange = (index, digit) => {
        if (disabled) return;
        
        // Only allow single digits
        if (digit.length > 1) return;
        if (digit && !/^\d$/.test(digit)) return;

        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        // Call parent onChange with full OTP string
        const otpString = newOtp.join('');
        console.log('SimpleOTPInput - new OTP:', otpString);
        onChange(otpString);

        // Auto-focus next input
        if (digit && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (disabled) return;

        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handlePaste = (e) => {
        if (disabled) return;
        
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
        const digits = pasteData.split('');
        const newOtp = [...digits, ...Array(4 - digits.length).fill('')];
        setOtp(newOtp);
        
        const otpString = newOtp.join('');
        console.log('SimpleOTPInput - pasted OTP:', otpString);
        onChange(otpString);
    };

    return (
        <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-300">OTP Kodi</label>
            <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        disabled={disabled}
                        className="w-12 h-12 text-center text-lg font-semibold border border-gray-600 rounded-lg bg-gray-800 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        maxLength={1}
                        autoComplete="off"
                    />
                ))}
            </div>
            <p className="text-xs text-gray-400 text-center">4 raqamli kodni kiriting</p>
        </div>
    );
};
