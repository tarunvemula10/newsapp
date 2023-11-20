import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

     static defaultProps = { country: 'in', category: 'general' }
     static updatedProps = { country: PropTypes.string, category: PropTypes.string }

     constructor(props) {
          super(props);
          this.state = {articles: [], loading: false, page: 2};
          document.title = `${(this.props.category).charAt(0).toUpperCase()+(this.props.category).slice(1)} - NewsHustlers`;
     }

     async componentDidMount() {
          this.updateNews()
     }

     updateNews = async () => {
          this.props.setProgress(10);
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=12`
          this.props.setProgress(50);
          this.setState({loading: true})
          let data = await fetch(url);
          this.props.setProgress(70);
          let parsedData = await data.json();
          this.setState({articles: parsedData.articles, loading: false});
          this.props.setProgress(100);
     }

     /*
     getPrevPage = async () => {
          this.setState({page: this.state.page - 1});
          this.updateNews();
     }

     getNextPage = async () => {
          if(this.state.page+1 <= (Math.ceil(this.state.totalResults/12))) {
               this.setState({page: this.state.page + 1});
               this.updateNews();
          }
     }
     */

     fetchMoreData = async () => {
          this.setState({page: this.state.page + 1});
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=6`
          this.setState({loading: true})
          let data = await fetch(url);
          let parsedData = await data.json();
          this.setState({articles: this.state.articles.concat(parsedData.articles), loading: false});
     }

     render() {
          return (
          <>
               <h2 className='text-center'>Headlines for today - {(this.props.category).charAt(0).toUpperCase()+(this.props.category).slice(1)}</h2>
               {/* {this.state.loading && <Loading/>} */}
               <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={(this.state.articles.length >= this.state.totalResults-1) ? <div className="card-footer text-body-secondary text-center">
                    End of the results </div> : <Loading/>}
               >
                    <div className="container">
                         <div className="row my-4">
                              {this.state.articles.map((element) => {
                                   return <div className="col-md-4" key={element.url}>
                                        <NewsItem title={(element.title!==null) ? element.title.slice(0, 40) : ""} 
                                        description={(element.description!==null)?element.description.slice(0, 88) : ""} 
                                        imageUrl={element.urlToImage} newsUrl={element.url}
                                        author={(element.author!=null) ? element.author : "Unknown"} date={element.publishedAt}
                                        popTitle={element.title}/>
                                   </div>
                              })}
                         </div>
                    </div>
               </InfiniteScroll>

               {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.getPrevPage}>&larr; Previous</button>
                    <button disabled={this.state.page+1 > (Math.ceil(this.state.totalResults/12))} type="button" className="btn btn-dark" onClick={this.getNextPage}>Next &rarr;</button>
               </div> */}
          </>
     )}
}