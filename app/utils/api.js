 const API_URL = process.env.NEXT_PUBLIC_BASE_URL  || 'https://3eb989695206.ngrok-free.app'; 
import { setTokens } from '../../lib/auth'; 
 
// 🟢 LOGIN – token olish
export async function login(email, password) {
  try {
    console.log('Making login request to:', `${API_URL}/users/login/`);
    console.log('Request body:', { email, password: '***' });
    
    const response = await fetch(`${API_URL}/users/login/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Login response status:', response.status);
    console.log('Login response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Login failed with error text:', errorText);
      throw new Error(`Login failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Login response data:', data);
    return data; // { message: "Verification code sent to email" } yoki { access, refresh }
  } catch (e) {
    console.error("Login error:", e);
    return null;
  }
}

// 🟢 REGISTER – foydalanuvchi yaratish
export async function register(username, password, email) {
  try {
    console.log('Making register request to:', `${API_URL}/users/register/`);
    console.log('Request body:', { username, email, password: '***' });
    
    const response = await fetch(`${API_URL}/users/register/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    console.log('Register response status:', response.status);
    console.log('Register response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Register failed with error text:', errorText);
      throw new Error(`Registration failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Register response data:', data);
    
    // Agar registration muvaffaqiyatli bo'lsa va tokenlar qaytarilsa, ularni saqlash
    if (data && data.access && data.refresh) {
      console.log('✅ Tokens received from registration:');
      console.log('Access token:', data.access);
      console.log('Refresh token:', data.refresh);
      setTokens(data.access, data.refresh);
      console.log('✅ Tokens saved to localStorage after registration');
    } else {
      console.log('ℹ️ No tokens received from registration. Response data:', data);
    }
    
    return data;
  } catch (e) {
    console.error("Register error:", e);
    return null;
  }
}

// 🟢 PAROLNI TIKLASH – bosqichi 1
export async function resetPassword(email) {
  try {
    const response = await fetch(`${API_URL}/users/reset/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) throw new Error('Reset password failed');
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Reset password error:", e);
    return null;
  }
}

// 🟢 PAROLNI TASDIQLASH – bosqichi 2
export async function resetConfirm(email, token, newPassword) {
  try {
    const response = await fetch(`${API_URL}/users/reset-confirm/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token, new_password: newPassword }),
    });

    if (!response.ok) throw new Error('Reset confirm failed');
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Reset confirm error:", e);
    return null;
  }
}

// 🟢 EMAIL TASDIQLASH
export async function verify(email, code) {
  // Try different possible endpoints
  const possibleEndpoints = [
    `${API_URL}/users/verify/`,
    `${API_URL}/users/verify`,
    `${API_URL}/auth/verify/`,
    `${API_URL}/api/verify/`,
    `${API_URL}/verify/`
  ];

  for (let endpoint of possibleEndpoints) {
    try {
      console.log('Trying verify request to:', endpoint);
      console.log('Request body:', { email, code });
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      console.log('Verify response status:', response.status);
      console.log('Verify response ok:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('Verify response data:', data);
        return data; // { access, refresh }
      } else if (response.status !== 404) {
        // If it's not a 404, this might be the right endpoint with a different error
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Verify failed with error:', errorData);
        
        if (response.status === 400) {
          throw new Error(errorData.error || 'Invalid or expired code');
        }
        
        throw new Error(`Verification failed with status ${response.status}`);
      }
      
      // If 404, try next endpoint
      console.log('404 error, trying next endpoint...');
    } catch (e) {
      if (e.message.includes('failed with status')) {
        throw e; // Re-throw non-404 errors
      }
      console.error("Network error trying endpoint", endpoint, ":", e);
    }
  }
  
  // If all endpoints failed
  console.error("All verify endpoints failed with 404");
  return null;
}

// 🟢 ACCESS TOKENNI YANGILASH
export async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch(`${API_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) throw new Error('Token refresh failed');
    const data = await response.json();
    return data.access;
  } catch (e) {
    console.error("Token refresh error:", e);
    return null;
  }
}

// 🟢 LOGOUT – tokenlarni bekor qilish
export async function logout(refreshToken) {
  try {
    const response = await fetch(`${API_URL}/users/logout/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      console.warn('Logout request failed, but continuing with local cleanup');
    }
    
    const data = await response.json().catch(() => ({}));
    return data;
  } catch (e) {
    console.error("Logout error:", e);
    // Even if logout fails on server, we should clear local tokens
    return { success: true };
  }
}

