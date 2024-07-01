import axios from "axios";

export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3NmIwMzE3YS03ZDI5LTQ4MjMtODY5NC0zNTFiNTEzZmIyOTYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxOTY2MjU5OSwiZXhwIjoxNzE5NzQ4OTk5fQ.k2pSmk2n4u9EmBQm2xxStbBmUYFvXp6sWwY-kaMFx5g";
// This is the Auth token, you will use it to generate a meeting and connect to it
// API call to create a meeting
export const createMeeting = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};

export const getToken = async () => {
  const response = await axios.post(`http://localhost:3000/meeting/getAuthKey`);
  // console.log(response.data);
  const token = response.data;
  return token;
}