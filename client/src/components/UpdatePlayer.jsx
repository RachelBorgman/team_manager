import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import DeleteButton from './DeleteButton';
// import AuthorForm from '../components/AuthorForm';
// import AuthorList from './AuthorList';
// import DeleteButton from './DeleteButton';

const Update = (props) => {
    const {removeFromDom} = props;
    const { id } = useParams();
    const [playerN, setPlayerN] = useState("");
    const [playerPosition, setPlayerPosition] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [playerNA, setPlayerNA] = useState("")
    const navigate = useNavigate();
    // retrieve the current values for this person so we can fill
    // in the form with what is in the db currently
    useEffect(() => {
        axios.get('http://localhost:8000/api/players/' + id)
            .then(res => {
                console.log("this is the get response:", res)
                // setTitle(res.data.title);
                // setPrice(res.data.price);
                // setDesc(res.data.description);
                setPlayerN(res.data.playerName)
                setPlayerPosition(res.data.position)
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err.response);
                setPlayerNA(`Player not available with input ID`);
            });
    }, []);

    const updatePlayer = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/players/${id}`, {playerName: playerN, position: playerPosition}) 
            .then(res => {
                console.log("this is the put response:", res);
                navigate("/"); // this will take us back to the Main.js
            })
            .catch((err) => {
                console.log(err)
                setErrors(err)
            })
    }

    return (
        <div>
            <h1>Update Player</h1>
            {
            loaded && (
                <>
                    <form onSubmit={updatePlayer}>
                        {playerNA ? 
                            <>
                            <h3>{playerNA}</h3>
                            <Link to="/players/addplayer">Add Player</Link>
                            </>
                        : null }
                        <Link to="/">Player List</Link>
                        <div>
                            <label htmlFor='playerName'>Name</label>
                            <input type="text" name="playerName" value={playerN} onChange={ (e) => setPlayerN(e.target.value)}/>
                            {errors.playerN ? <p>{errors.playerName}</p> : null}
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor='position'>Position </label>
                            <input type="text" name="position" value={playerPosition} onChange={ (e) => setPlayerPosition(e.target.value)}/>
                            {errors.playerPosition ? <p>{errors.position}</p> : null}
                        </div>
                        <br></br>
                        <input type="submit" value="Submit" />
                    </form>
                    <DeleteButton playerID={id} successCallback={()=> removeFromDom(id)}/>
                </>
            )}
        </div>
    )
}
export default Update;