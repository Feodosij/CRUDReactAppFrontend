import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const CardList = () => {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardPerPage] = useState(5);
    const lastCardIndex = currentPage * cardPerPage;
    const firstCardIndex = lastCardIndex - cardPerPage;
    const currentCard = cards.slice(firstCardIndex, lastCardIndex);

    useEffect(() => {
        getCards();
    }, []);

    const getCards = async() => {
        const response = await axios.get("http://localhost:5000/cards");
        setCards(response.data);
    }

    const deleteCard = async (cardId) => {
        try {
            await axios.delete(`http://localhost:5000/cards/${cardId}`);
            getCards();
          } catch (error) {
            console.log(error);
          }
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return ( 
      <div>
        <div className="container mt-5 mr-5 ml-5 mb-5 ">
            <Link to="/add" className="button is-success">Add New</Link>
            <div className="columns is-0 mt-2">
                {currentCard.map((card) => (
                    <div className="column is-one-quarter" key={card.id}>
                    <div className="card">
                      <div className="card-image">
                        <figure className="image is-3by4">
                          <img src={card.url} alt="Hero_Image"/>
                        </figure>
                      </div>
                      <div className="card-content">
                        <div className="media">
                          <div className="media-content">
                            <p className="title is-4">{card.name}</p>
                          </div>
                        </div>
                      </div>
                      <footer className="card-footer">
                      <Link to={`view/${card.id}`} className="card-footer-item">View</Link>
                        <a href="/#" onClick={() => deleteCard(card.id)} className="card-footer-item">Delete</a>
                      </footer>
                    </div>
                </div>
                ))}
                
            </div>
        </div>
        <Pagination 
          cards={cards.length} 
          cardPerPage={cardPerPage}
          paginate={paginate}
        />
      </div>
     );
}
 
export default CardList;