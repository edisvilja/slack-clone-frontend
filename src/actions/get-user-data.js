import {cookies} from 'next/headers';


export const getUserData = async (path = "") => {
  try {
    const getCookie = async (name) => {
      return cookies().get(name)?.value ?? '';
    }
  
    const cookie = await getCookie('token');
    const response = await fetch("http://localhost:3000/api/user/" + path, {
      headers: {
        Cookie: `token=${cookie};`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fehler beim Abrufen der Benutzerdaten:", error);
    return null
  }
}