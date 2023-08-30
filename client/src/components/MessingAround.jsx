import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from '@mui/material'
import { red } from '@mui/material/colors';

const MStatusGameThree = (props) => {
    const {setPlayerList, playerList} = props;
    const [gameID, setGameID] = useState(3)
    
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

    const nothingStyle = {
        // margin: "1rem",
        backgroundColor: "white",
        color: 'black'
    };
    const undecidedStyle = {
        // margin: "1rem",
        backgroundColor: "yellow",
        color: 'white'
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
        // let playerRow=document.getElementsByName(`playerRow${player._id}`)[0]
        console.log("THIS IS THE GAME ID= ", gameID)
        if (gameID == "1") {
            gameData.gameOneStatus = newStatus;
        } else if (gameID == "2") {
            gameData.gameTwoStatus = newStatus;
        } else {
            gameData.gameThreeStatus = newStatus;
            // playingBtn = playerRow.getElementsByClassName("playingStatus")
            // notPlayingBtn = playerRow.getElementsByClassName("notPlaying")
            // undecidedBtn = playerRow.getElementsByClassName("undecided")
            // switch (newStatus) {
            //     case "Playing":
            //         playingBtn.className.push("Active")
            //         notPlayingBtn.className.remove("Active")
            //         undecidedBtn.className.remove("Active")
            //     break;
            //     case "Not Playing":
            //     break;
            //     default:
            //     break;
            }
            
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
                <h1>Player Status - Game 3</h1>
                <div className="secondHeader">
                    <div className="secondHeaderLinks">
                        <Link to={`/status/game/1`} style={linkStyleUnselected}>Game 1</Link>
                        <Link to={`/status/game/2`} style={linkStyleUnselected}>Game 2</Link>
                        <Link to={`/status/game/3`} style={linkStyleSelected}>Game 3</Link>
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
                                    <tr name={`playerRow${player._id}`} key={player._id}>
                                        <td>{player.playerName}</td>
                                        <td>
                                            <Button className={`playingStatus ${player.gameThreeStatus == "Playing" ? 
                                                "Active": ""}`}
                                                onClick={() =>
                                                handlePlayingStatus(player._id, "Playing")
                                                }>Playing
                                            </Button>
                                            <Button className={`notPlaying${player.gameThreeStatus == "Not Playing" ? "Active" : ""}`}
                                                onClick={() =>
                                                handlePlayingStatus(player._id, "Not Playing")
                                                }>Not Playing
                                            </Button>
                                            <Button className={`undecided ${player.gameThreeStatus == "Undecided" ? "Active" : ""}`}
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
export default MStatusGameThree;