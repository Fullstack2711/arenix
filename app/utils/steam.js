const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';

// Steam login  
export async function steamLogin(loginData) {
    try {
        const response = await fetch(`${API_URL}/api/steam/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) throw new Error('Steam login failed');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Steam login error:", error);
        return null;
    }
}

// Steam callback  
export async function steamCallback(data) {
    try {
        const response = await fetch(`${API_URL}/api/steam/callback/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Steam callback failed: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Steam callback error:", error);
        return null;
    }
}

 //api/steam/login/ dan Steam URL olish
export async function initiateSteamLogin() {
    try {
        const response = await fetch(`${API_URL}/api/steam/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                redirect_url: `${window.location.origin}/steam-callback`
            }),
        });

        if (!response.ok) {
            throw new Error(`Steam login initiation failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Backend dan Steam login URL qaytganda, foydalanuvchini yo'naltirish
        if (data.steam_login_url || data.url || data.login_url) {
            const steamUrl = data.steam_login_url || data.url || data.login_url;
            window.location.href = steamUrl;
        } else {
            throw new Error('Steam login URL not received from backend');
        }
        
        return data;
    } catch (error) {
        console.error("Steam login initiation error:", error);
        throw error;
    }
}
