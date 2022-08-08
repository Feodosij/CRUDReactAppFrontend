import React from 'react';

const Pagination = ({cards, cardPerPage, paginate}) => {
    const pageNumbers = []

    for( let i = 1; i <= Math.ceil(cards / cardPerPage); i++) {
        pageNumbers.push(i)
        console.log(pageNumbers)
    }

    return ( 
        <div>
            <nav className="pagination ml-5" role="navigation" aria-label="pagination">
                <ul className="pagination-list" role="navigation" aria-label="pagination">
                {pageNumbers.map((number) => (
                    <li className="page-item" key={number}>
                        
                        <a href="/#" className="pagination-link" onClick={() => paginate(number)}>
                            {number} {console.log(number)}
                        </a>
                    </li>  
                ))}
            </ul>
            </nav>
        </div>
     );
}
 
export default Pagination;