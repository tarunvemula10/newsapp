import React from 'react';
import PropTypes from 'prop-types';

const NewsItem = (props)=> {
     let {title, description, imageUrl, newsUrl, author, date, popTitle} = props;
     return (
     <div className="card my-3">
          <img src={imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
               <h5 className="card-title" title={popTitle} style={{cursor: 'pointer'}}>{title}...</h5>
               <p className="card-text">{description}...</p>
               <p className="card-text"><small className="text-body-secondary">Published by {author} on {new Date(date).toUTCString()}</small></p>
               <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
     </div>
     )
}
export default NewsItem;