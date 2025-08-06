const API_URL = 'http://198.211.96.176';

// 🟢 LOGIN – token olish
export async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/api/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    return data; // { access, refresh }
  } catch (e) {
    console.error("Login error:", e);
    return null;
  }
}

// 🟢 REGISTER – foydalanuvchi yaratish
export async function register(username, password, email) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) throw new Error('Registration failed');
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Register error:", e);
    return null;
  }
}

// 🟢 PAROLNI TIKLASH – bosqichi 1
export async function resetPassword(email) {
  try {
    const response = await fetch(`${API_URL}/users/reset`, {
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
    const response = await fetch(`${API_URL}/users/reset/confirm`, {
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
  try {
    const response = await fetch(`${API_URL}/users/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    if (!response.ok) throw new Error('Verification failed');
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Verify error:", e);
    return null;
  }
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
