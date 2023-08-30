import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const AddPlayerForm = (props) => {
    const {setPlayerList, playerList, initialName, initialPosition, setErrors, errors} = props;
    const [playerName, setPlayerName] = useState(initialName);
    const navigate = useNavigate();
    const [position, setPosition] = useState(initialPosition);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // const newProduct = {title: title, price: price, description: description};
        // console.log("New Product: ", newProduct)
        axios.post('http://localhost:8000/api/players', ({playerName, position}))
            .then(res => {
                    // console.log(res);
                console.log(res.data)
                setPlayerList([...playerList, res.data])
                })
            .catch((err)=> {
            console.log("this is the err:", err);
            console.log("this is the err.message:", err.message);
            const errorResponse = err.message; // Get the errors from err.response.data
                    // const errorArr = []; // Define a temp error array to push the messages in
                    //   for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    //     errorArr.push(errorResponse[key].message)
                    // }
            setErrors(errorResponse);
            navigate("/")
            })
        navigate("/")
            
    };

    return(
        <div>
            <div className="headerBox">
                <div className="firstHeaderLinks">
                    <Link to={`/`}>Manage Players</Link>
                    <Link to={`/status/game/1`}>Manage Player Status</Link>
                </div>
                <div className="secondHeader">
                    <div className="secondHeaderLinks">
                        <Link to={`/`}>List</Link>
                        <Link to={`/players/addplayer`}>Add Player</Link> 
                    </div>
                        <h1>Add a Player</h1>
                        <form onSubmit={onSubmitHandler}>
                            <div>
                                <label>Name</label>
                                <input type="text" name="playerName" value={playerName} onChange={ (e) => setPlayerName(e.target.value)}/>
                                {errors.message ? <p>{errors.message}</p> : null}
                            </div>
                            <br></br>
                            <div>
                                <label>Position </label>
                                <input type="text" name="position" value={position} onChange={ (e) => setPosition(e.target.value)}/>
                                {errors.message ? <p>{errors.message}</p> : null}
                            </div>
                            <br></br>
                                <input type="submit" value="Submit" />
                        </form>
                </div>
            </div>
        </div>
    )
};

export default AddPlayerForm;