import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
     constructor() {
          super();
          this.state = {articles: [], loading: false, page: 1};
     }

     async componentDidMount() {
          let data = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=bf62df5e33284fd2a10663b8295b5303&page=1&pageSize=12");
          let parsedData = await data.json();
          this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
     }

     getPrevPage = async () => {
          let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bf62df5e33284fd2a10663b8295b5303&page=${this.state.page-1}&pageSize=12`
          let data = await fetch(url);
          let parsedData = await data.json();
          this.setState({articles: parsedData.articles, page: this.state.page-1});
     }

     getNextPage = async () => {
          if(this.state.page+1 <= (Math.ceil(this.state.totalResults/12))) {
               let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bf62df5e33284fd2a10663b8295b5303&page=${this.state.page+1}&pageSize=12`
               let data = await fetch(url);
               let parsedData = await data.json();
               this.setState({articles: parsedData.articles, page: this.state.page+1});
          }
     }

     render() {
          return (
          <div className='container my-4'>
               <h2>Headlines for today</h2>
               <div className="row my-4">
                    {this.state.articles.map((element) => {
                         return <div className="col-md-4" key={element.url}>
                              <NewsItem title={(element.title!==null) ? element.title.slice(0, 40) : ""} description={(element.description!==null)?element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                         </div>
                    })}
               </div>

               <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.getPrevPage}>&larr; Previous</button>
                    <button disabled={this.state.page+1 > (Math.ceil(this.state.totalResults/12))} type="button" className="btn btn-dark" onClick={this.getNextPage}>Next &rarr;</button>
               </div>
          </div>
     )}
}