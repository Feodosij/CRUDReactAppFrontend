import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCard = () => {
    const [title, setTitle] = useState("");
    const [real_name, setReal_name] = useState("");
    const [origin_description, setOrigin_description] = useState("");
    const [superpowers, setSuperpowers] = useState("");
    const [catch_phrase, setCatch_phrase] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getCardById();
    },[]);

    const getCardById = async () => {
        const response = await axios.get(`http://localhost:5000/cards/${id}`);
        setTitle(response.data.name);
        setReal_name(response.data.real_name);
        setOrigin_description(response.data.origin_description);
        setSuperpowers(response.data.superpowers);
        setCatch_phrase(response.data.catch_phrase);
        setFile(response.data.image);
        setPreview(response.data.url);
    }

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }
    
    const updateCard = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("real_name", real_name);
        formData.append("origin_description", origin_description);
        formData.append("superpowers", superpowers);
        formData.append("catch_phrase", catch_phrase);

        try {
            await axios.patch(`http://localhost:5000/cards/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                  },  
            });
            navigate(`/view/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={updateCard}>
                    <div className="field">
                        <label className="label">Heroes Name</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Heroes Name"
                            />
                        </div>

                        <label className="label">Real Name</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                value={real_name} 
                                onChange={(e) => setReal_name(e.target.value)}
                                placeholder="Heroes Real Name"
                            />
                        </div>

                        <label className="label">Origin description</label>
                        <div className="control">
                            <textarea 
                            className="textarea" 
                            value={origin_description}
                            placeholder="Add description" 
                            onChange={(e) => setOrigin_description(e.target.value)}
                            rows="3"
                            ></textarea>
                        </div>

                        <label className="label">Superpowers</label>
                        <div className="control">
                            <textarea 
                            className="textarea" 
                            value={superpowers}
                            placeholder="Add superpowers" 
                            onChange={(e) => setSuperpowers(e.target.value)}
                            rows="2"
                            ></textarea>
                        </div>

                        <label className="label">Catch phrase</label>
                        <div className="control">
                            <textarea 
                            className="textarea" 
                            value={catch_phrase}
                            placeholder="Add catch phrase" 
                            onChange={(e) => setCatch_phrase(e.target.value)}
                            rows="2"
                            ></textarea>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Image</label>
                        <div className="control">
                            <label className="file-label">
                                <input 
                                    type="file" 
                                    className="file-input" 
                                    onChange={loadImage} />
                                <span className="file-cta">
                                    <span className="file-label">Choose heroes image...</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    {preview ? (
                        <figure className="image is-128x128">
                            <img src={preview} alt="Preview"/>
                        </figure>
                    ) : (
                        ""
                    )}

                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default EditCard;