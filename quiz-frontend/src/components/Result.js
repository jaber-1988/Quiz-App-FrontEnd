import React from 'react'
import { useState } from "react";
import axios from "axios";


const apiHost = process.env.REACT_APP_API_HOST



export default function Result() {

  const [playerNew, setPlayerNew] = useState({})

  const createPlayer = async () => {
    try {
      const respons = await axios.post(`${apiHost}/addPlayer/`, playerNew);
      console.log(respons);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <h2>Your Score:</h2>

      <label>Your Name: </label>
      <input type="text" required defaultValue="" onChange={(e) => { setPlayerNew({ ...playerNew, yourName: e.target.value }); console.log(playerNew); }} />


      <button onClick={() => { createPlayer() }}>Save</button>
    </div>
  )
}
