import React, { useState, useEffect } from 'react'
// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddPlayerForm from '../components/AddPlayerForm';
import Update from '../components/UpdatePlayer';
import PlayerList from '../components/PlayerList';
import DeleteButton from '../components/DeleteButton';
import ManageStatus from '../components/ManageStatus';
import MSGameTwo from '../components/MSGameTwo';
import MSGameThree from '../components/MSGameThree';

function Main() {

    const [playerList, setPlayerList] = useState([]);
    const [errors, setErrors] = useState({})
    const [gameID, setGameID] = useState(1)
  // const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/players')
            .then(res => {
                setPlayerList(res.data)
            })
            .catch((err)=>console.log(err))
        }, [])

    const removeFromDom = playerID => {
        axios.delete("http://localhost:8000/api/players/" + playerID)
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            const newPlayerList = playerList.filter((player) => player._id !== playerID)
            setPlayerList(newPlayerList);
        })
        .catch((err)=>console.log(err))
    }

    return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route element={<PlayerList  playerList={playerList}  setPlayerList={setPlayerList}  removeFromDom={removeFromDom}/>} path="/" default />
                <Route element={<AddPlayerForm initialName="" initialPosition="" playerList={playerList} setPlayerList={setPlayerList} setErrors={setErrors} errors={errors}/>} path="/players/addplayer" />
                <Route element={<Update  playerList={playerList}  setPlayerList={setPlayerList}  removeFromDom={removeFromDom} initialName="" initialPosition="" />} path="/players/edit/:id" />
                <Route element={<ManageStatus  playerList={playerList} gameID={gameID} setGameID={setGameID} />} path="/status/game/1"/>
                <Route element={<MSGameTwo  playerList={playerList} />} path="/status/game/2"/>
                <Route element={<MSGameThree  playerList={playerList}/>} path="/status/game/3"/>
            </Routes>
        </BrowserRouter>
    </div>
    )
}

export default Main;