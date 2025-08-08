import axios from "axios";
 
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

console.log("API URL:", API_URL);
export const getTournaments = async () => {
  try {
    const response = await fetch(`${API_URL}/tournaments/games/`, {
        headers: {
    'ngrok-skip-browser-warning': 'true'
  }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch tournaments:', error);
    throw error;
  }
}


//ALL tournaments leaderboard
 export const tournamentsLeaderboard = async ( ) => {
    try {
        const response = await axios.get(`${API_URL}/tournaments/leaderboard/`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch tournaments leaderboard');
        }
        return response.data;
        
    } catch (error) {
        console.error('Failed to fetch tournaments leaderboard:', error);
        throw error;
        
    }
}


//Get tournament by id
export const getTournamentById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tournaments/games/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch tournament with id ${id}:`, error);
    throw error;
  }
}



//join tournament
export  const  joinTournament = async (tournamentId, userId) => {
  try {
     const response = await fetch(`${API_URL}/tournaments/tournaments/${tournamentId}/join/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to join tournament');
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to join tournament with id ${tournamentId}:`, error);
    throw error;
  }
}
