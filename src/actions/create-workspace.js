"use server"

import { cookies } from "next/headers";

export const createWorkspace = async ({imageUrl, name}) => {
  const getCookie = async (name) => {
    return cookies().get(name)?.value ?? '';
  }

  const cookie = await getCookie('token');
  const response = await fetch("http://localhost:3000/api/workspace", {
    method: "POST", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cookie': `token=${cookie};`
    },
    body: JSON.stringify({imageUrl, name})
  });

  if (!response.ok) {
    const body = await response.json()
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText} - ${JSON.stringify(response.body)}`);
  }

  return await response.json();
}