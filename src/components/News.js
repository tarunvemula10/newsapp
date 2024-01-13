import React, {useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=> {

     const [articles, updateArticles] = useState([]);
     const [loading, setLoading] = useState(false);
     const [page, updatePage] = useState(2);
     const [totalResults, updateTotalResults] = useState(0);

     useEffect(()=> {
          document.title = `${(props.category).charAt(0).toUpperCase()+(props.category).slice(1)} - NewsHustlers`;
          updateNews();
          // eslint-disable-next-line
     }, []);

     const updateNews = async () => {
          props.setProgress(10);
          let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=12`
          props.setProgress(50);
          setLoading(true);
          let data = await fetch(url);
          props.setProgress(70);
          let parsedData = await data.json();
          updateArticles(parsedData.articles);
          updateTotalResults(parsedData.totalResults)
          setLoading(false);
          props.setProgress(100);
     }

     /*
     getPrevPage = async () => {
          setState({page: page - 1});
          updateNews();
     }

     getNextPage = async () => {
          if(page+1 <= (Math.ceil(totalResults/12))) {
               setState({page: page + 1});
               updateNews();
          }
     }
     */

     const fetchMoreData = async () => {
          let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=6`
          updatePage(page + 1);
          setLoading(true);
          let data = await fetch(url);
          let parsedData = await data.json();
          updateArticles(articles.concat(parsedData.articles))
          setLoading(false);
     }
     return (
          <div className='pt-5'>
               <h2 className='text-center mt-3'>Headlines for today - {(props.category).charAt(0).toUpperCase()+(props.category).slice(1)}</h2>
               {/* {loading && <Loading/>} */}
               <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={(articles.length >= totalResults-1) ? <div className="card-footer text-body-secondary text-center">
                    End of the results </div> : loading && <Loading/>}
               >
                    <div className="container">
                         <div className="row my-4">
                              {articles.map((element) => {
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
                    <button disabled={page<=1} type="button" className="btn btn-dark" onClick={getPrevPage}>&larr; Previous</button>
                    <button disabled={page+1 > (Math.ceil(totalResults/12))} type="button" className="btn btn-dark" onClick={getNextPage}>Next &rarr;</button>
               </div> */}
          </div>
     )
}
News.defaultProps = { country: 'in', category: 'general' }
News.updatedProps = { country: PropTypes.string, category: PropTypes.string }

export default News;