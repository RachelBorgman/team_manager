import React, {useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteButton from './DeleteButton';
import { Button } from '@mui/material'

const PlayerList = (props) => {
    const {setPlayerList, playerList, removeFromDom} = props;
    // const {authorList, setAuthorList} = props;
    // const navigate = useNavigate();

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

    // const removeFromDom = (authorId) => {
    //     const newAuthorList = authorList.filter((author) => author._id !== authorId)
    //         setAuthorList(newAuthorList)
    // })
    //         .catch(err=> console.log(err))
    // }

    return (
        <div>
            <div className="headerBox">
                <div className="firstHeaderLinks">
                    <Link to={`/`}  style={linkStyleSelected} >Manage Players</Link>
                    <Link to={`/status/game/1`}  style={linkStyleUnselected}>Manage Player Status</Link>
                </div>
                <div className="secondHeader">
                    <div className="secondHeaderLinks">
                        <Link to={`/`}  style={linkStyleSelected}>List</Link>
                        <Link to={`/players/addplayer`}  style={linkStyleUnselected}>Add Player</Link> 
                    </div>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>Player Name</th>
                                    <th scope='col'>Preferred Position</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                playerList && playerList.map((player)=>{
                                return(
                                    <tr key={player._id}>
                                        <td>{player.playerName}</td>
                                        <td>{player.position}</td>
                                        <td>
                                            {/* <Link to={`/authors/edit/${author._id}`}>Edit</Link> */}
                                            <DeleteButton playerID={player._id} successCallback={()=> removeFromDom(player._id)}/>
                                        </td>
                                    </tr>
                                )})
                            }
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    
    )
}
export default PlayerList;