import React, { useState } from 'react'
import { Link } from "react-router-dom";

export default function Channel({room, creator, id, deleteChannel}) {

    const [pseudo, setPseudo] = useState('')

    function handleClick(id) {
        deleteChannel(id);
    }

    return (
        <div>
            <h1>{room}</h1>
            <h3>Salon de {creator}</h3>
            <div>
                <input onChange={(event) => setPseudo(event.target.value)} placeholder='pseudo' type='text' />
                <Link onClick={(event) => (!pseudo || !room) ? event.preventDefault() : null} to={`/chat/${id}?pseudo=${pseudo}&room=${room}`}>
                    <button>Joindre le chat</button>
                </Link>
            </div>
            <p><span><Link to={"/edit/" + id}>Edit</Link></span><span><a href='/' onClick={() => handleClick(id)}>Supprimer</a></span></p>
        </div>
    )
}
