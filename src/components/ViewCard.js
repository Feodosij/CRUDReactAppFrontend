import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const EditCard = () => {
    const [title, setTitle] = useState("");
    const [real_name, setReal_name] = useState("");
    const [origin_description, setOrigin_description] = useState("");
    const [superpowers, setSuperpowers] = useState("");
    const [catch_phrase, setCatch_phrase] = useState("");
    const [preview, setPreview] = useState("");
    const { id } = useParams();

    useEffect(() => {
        getCardById();
    },);

    const getCardById = async () => {
        const response = await axios.get(`http://localhost:5000/cards/${id}`);
        setTitle(response.data.name);
        setReal_name(response.data.real_name);
        setOrigin_description(response.data.origin_description);
        setSuperpowers(response.data.superpowers);
        setCatch_phrase(response.data.catch_phrase);
        setPreview(response.data.url);
    }

    return ( 
            <div className="content is-medium view_container">
                <div className="view_header">
                    <div>
                        <img src={preview} className="view_image" alt="Preview"/>
                    </div>
                    <div>
                        <h1>{title}</h1>
                    <h3> Real Name: {real_name}</h3>
                    </div>
                 </div>
                <div className="description">
                <div className="">
                    <h3 className="">Origin description:</h3>
                <p>{origin_description}</p>
                </div>
                <div>
                    <h3>Superpowers:</h3>
                <p>{superpowers}</p>
                </div>
                <div>
                    <h3>Catch phrase:</h3>
                <p>{catch_phrase}</p>
                </div>
                </div>
                
    
                    <footer className="card-footer"> 
                <Link to={`/edit/${id}`} className="card-footer-item">
                  Edit
                </Link>   
                <Link to={"/"} className="card-footer-item">
                  To list
                </Link> 
              </footer>
            </div>
     );
}
 
export default EditCard;