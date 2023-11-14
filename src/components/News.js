import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'

export default class News extends Component {

     static defaultProps = { country: 'in', category: 'general' }
     static updatedProps = { country: PropTypes.string, category: PropTypes.string }

     constructor() {
          super();
          this.state = {articles: [], loading: false, page: 1};
     }

     async componentDidMount() {
          this.setState({loading: true})
          let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf62df5e33284fd2a10663b8295b5303&page=1&pageSize=12`);
          let parsedData = await data.json();
          this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false});
     }

     getPrevPage = async () => {
          this.setState({loading: true})
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf62df5e33284fd2a10663b8295b5303&page=${this.state.page-1}&pageSize=12`
          let data = await fetch(url);
          let parsedData = await data.json();
          this.setState({articles: parsedData.articles, page: this.state.page-1, loading: false});
     }

     getNextPage = async () => {
          if(this.state.page+1 <= (Math.ceil(this.state.totalResults/12))) {
               this.setState({loading: true})
               let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf62df5e33284fd2a10663b8295b5303&page=${this.state.page+1}&pageSize=12`
               let data = await fetch(url);
               let parsedData = await data.json();
               this.setState({articles: parsedData.articles, page: this.state.page+1, loading: false});
          }
     }

     render() {
          return (
          <div className='container my-4'>
               <h2 className='text-center'>Headlines for today</h2>
               {this.state.loading && <Loading/>}
               <div className="row my-4">
                    {!this.state.loading && this.state.articles.map((element) => {
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