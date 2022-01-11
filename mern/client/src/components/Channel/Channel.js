import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Channel({room, creator, id, deleteChannel}) {

    const [pseudo, setPseudo] = useState('')

    function handleClick(event, id) {
        //event.preventDefault();
        deleteChannel(id);
    }

    function handleJoinClick(event) {
        event.preventDefault();
        console.log(id);
    }

    return (
        <div>
            <h1>{room}</h1>
            <h3>Salon de {creator}</h3>
            <div>
                <input onChange={(event) => setPseudo(event.target.value)} placeholder='pseudo' type='text' />
                <Link onClick={(event) => (!pseudo || !room) ? event.preventDefault() : null} to={`/chat?pseudo=${pseudo}&room=${room}`}>
                    <button onClick={(event) => handleJoinClick(event)}>Joindre le chat</button>
                </Link>
            </div>
            <p><span><Link to={"/edit/" + id}>Edit</Link></span><span><a href='/' onClick={(event) => handleClick(event, id)}>Supprimer</a></span></p>
        </div>
    )
}
