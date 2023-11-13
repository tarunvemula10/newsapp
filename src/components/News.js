import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
     constructor() {
          super();
          this.state = { articles: [], loading: false };
     }

     async componentDidMount() {
          let data = await fetch("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=bf62df5e33284fd2a10663b8295b5303");
          let parsedData = await data.json();
          this.setState({articles: parsedData.articles});
     }
     render() {
          return (
          <div className='container my-4'>
               <h2>Headlines for today</h2>
               <div className="row my-4">
                    {this.state.articles.map((element) => {
                         return <div className="col-md-4">
                              <NewsItem title={(element.title!==null) ? element.title.slice(0, 40) : ""} description={(element.description!==null)?element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                         </div>
                    })}
               </div>
          </div>
     )}
}
