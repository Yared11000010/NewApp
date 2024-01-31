import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 12,
        category: 'general',
        setProgress:0,
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        setProgress: PropTypes.number,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            keyCounter: 1
        }
    }

    async updateNews(){

        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4424425e3caa464f898f2ca5e63a673b&page=${this.state.page}&pageSize=12`;
        const data = await fetch(url);
        this.props.setProgress(30);
        const parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            totalResults: parsedData.totalResults,
            articles: parsedData.articles
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
       this.updateNews();
    }

    handlePreClick = async () => {
        this.setState({
            page:this.state.page-1
        });
        this.updateNews();
    }

    handleNexClick = async () => {

        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 12)) {
        } 
        else 
        {
           this.setState({
            page:this.state.page+1
           });
           this.updateNews();
        }

    }

    render() {
        return (
            <div className='container my-3'>
                <h2>Headlines</h2>
                <div className="row ">
                    {this.state.articles.map((element) => {
                        const uniqueKey = this.state.keyCounter++;
                        return <div className='col-md-4' key={uniqueKey}>
                            <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 50) : ""} imgUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} />
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button type='button' disabled={this.state.page <= 1} onClick={this.handlePreClick} className='btn btn-secondary'>&larr; Previous</button>
                    <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 12)} onClick={this.handleNexClick} className='btn btn-secondary'> Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News