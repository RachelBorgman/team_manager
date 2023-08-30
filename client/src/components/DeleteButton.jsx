import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const DeleteButton = (props) => {
    function showAlert(playerName){
        alert(`Are you sure you want to delete ${playerName}`)
    }
    const { playerName, playerID, successCallback } = props;
    const navigate = useNavigate();
    const deletePlayer = e => {
        showAlert(playerName)
        axios.delete('http://localhost:8000/api/players/' + playerID)
            .then(res=>{
                successCallback();
                navigate("/");
            })
    }
    return (
        <button onClick={deletePlayer}>
            Delete
        </button>
    )
}
export default DeleteButton;