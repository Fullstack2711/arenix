const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
import { getAccessToken } from '../../lib/auth';


// Steam login  
export async function steamLogin(loginData) {
    try {
        const accessToken = getAccessToken();
        const headers = { 
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true',
        };
        
        // Token mavjud bo'lsa, Authorization header qo'shish
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(`${API_URL}/api/steam/login/`, {
            method: 'GET',
            headers,
            mode: 'cors',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Steam login failed with response:', errorText);
            throw new Error(`Steam login failed: ${response.status} ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const responseText = await response.text();
            console.error('Expected JSON but got:', contentType, 'Response:', responseText);
            throw new Error('Server returned non-JSON response');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Steam login error:", error);
        return null;
    }
}

// Steam callback - backend ga Steam ma'lumotlarini yuborish
export async function steamCallback(steamData) {
    try {
        const accessToken = getAccessToken();
        const headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
        };
        
        // Token mavjud bo'lsa, Authorization header qo'shish
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        console.log('Steam callback with data:', steamData);
        console.log('API URL:', API_URL);

        // Steam callback parametrlarini query string sifatida yuborish
        const queryParams = new URLSearchParams(steamData).toString();
        const response = await fetch(`${API_URL}/api/steam/callback/?${queryParams}`, {
            method: 'GET',
            headers,
            mode: 'cors',
        });

        console.log('Steam callback response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Steam callback failed with response:', errorText);
            throw new Error(`Steam callback failed: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const responseText = await response.text();
            console.error('Expected JSON but got:', contentType, 'Response:', responseText);
            throw new Error('Server returned non-JSON response');
        }

        const responseData = await response.json();
        console.log('Steam callback response data:', responseData);
        return responseData;
    } catch (error) {
        console.error("Steam callback error:", error);
        throw error;
    }
}

// Steam login URL olish va redirect qilish
export async function initiateSteamLogin() {
    try{
        window.location.href = `${API_URL}/api/steam/login/?access_token=${getAccessToken()}`;        
    }catch (error) {
        console.error("Error initiating Steam login:", error);
        throw error;
    }
}

 