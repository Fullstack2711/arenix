export async function steamLogin(loginData) {
    try {
        const response = await fetch(`${API_URL}/auth/steam/`, {
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
