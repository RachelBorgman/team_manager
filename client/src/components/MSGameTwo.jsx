import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from '@mui/material'

const MStatusGameTwo = (props) => {
    const {setPlayerList, playerList} = props;
    const [gameID, setGameID] = useState(2)
    const linkStyleSelected = {
        // margin: "1rem",
        fontSize: '1.5em',
        textDecoration: 'underline',
        // color: 'white'
    };

    const linkStyleUnselected = {
        // margin: "1rem",
        textDecoration: "underline",
        // color: 'white'
    };

    // const handlePlayingStatus = (playerID) => {
    //     let b1 = document.getElementById("button1");
    //     let b2 = document.getElementById("button2");
    //     let b3 = document.getElementById("button3");
    //     b1.style.backgroundColor = 'green'
    //     b2.style.backgroundColor = 'white'
    //     b3.style.backgroundColor = 'white'
    //     };

    // const handleNotPlayingStatus = (playerID) => {
    //     let b1 = document.getElementById("button1");
    //     let b2 = document.getElementById("button2");
    //     let b3 = document.getElementById("button3");
    //     b1.style.backgroundColor = 'white'
    //     b2.style.backgroundColor = 'red'
    //     b3.style.backgroundColor = 'white'
    //     };

    // const handleUndecidedStatus = (playerID) => {
    //     let b1 = document.getElementById("button1");
    //     let b2 = document.getElementById("button2");
    //     let b3 = document.getElementById("button3");
    //     b1.style.backgroundColor = 'white'
    //     b2.style.backgroundColor = 'white'
    //     b3.style.backgroundColor = 'yellow'
    //     };
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/players")
            .then((res)=>{
                console.log(res.data);
                setPlayerList(res.data);
	})
        .catch((err)=>{
            console.log(err.res);
        })
    }, [])

    const handlePlayingStatus = (idFromBelow, newStatus) => {
        let gameData = {};
        console.log("THIS IS THE GAME ID= ", gameID)
        if (gameID === "1") {
            gameData.gameOneStatus = newStatus;
        // } else if (gameID === "2") {
        //     gameData.gameTwoStatus = newStatus;
        } else {
            gameData.gameTwoStatus = newStatus;
        }
        axios
            .put(`http://localhost:8000/api/players/${idFromBelow}`, gameData)
            .then((response) => {
            console.log(response);
        })
            .catch((err) => console.log(err.response));
        };

    return (
        <div>
            <div className="headerBox">
                <div className="firstHeaderLinks">
                    <Link to={`/`} style={linkStyleUnselected}>Manage Players</Link>
                    <Link to={`/status/game/1`} style={linkStyleSelected}>Manage Player Status</Link>
                </div>
                <h1>Player Status - Game 2 {props.gameID}</h1>
                <div className="secondHeader">
                    <div className="secondHeaderLinks">
                        <Link to={`/status/game/1`} style={linkStyleUnselected}>Game 1</Link>
                        <Link to={`/status/game/2`} style={linkStyleSelected}>Game 2</Link>
                        <Link to={`/status/game/3`} style={linkStyleUnselected}>Game 3</Link>
                    </div>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>Player Name</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {playerList && playerList.map((player)=>{
                                return(
                                    <tr key={player._id}>
                                        <td>{player.playerName}</td>
                                        <td>
                                            <Button className={`${player.gameTwoStatus === "Playing" ? 
                                                "playingStatus": ""}`}
                                                onClick={() =>
                                                handlePlayingStatus(player._id, "Playing")
                                                }>Playing
                                            </Button>
                                            <Button className={`${player.gameTwoStatus === "Not Playing" ? "notPlaying" : ""}`}
                                                onClick={() =>
                                                handlePlayingStatus(player._id, "Not Playing")
                                                }>Not Playing
                                            </Button>
                                            <Button className={`${player.gameTwoStatus === "Undecided" ? "undecided" : ""}`}
                                                onClick={() =>
                                                handlePlayingStatus(player._id, "Undecided")
                                                }>Undecided
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                            }
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    
    )
}
export default MStatusGameTwo;