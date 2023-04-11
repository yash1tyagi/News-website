import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class News extends Component {

    constructor() {
        super()
        this.state = {
            artical: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        const url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=0e6505d592af40e09274e69a1f9c35c3"
        const response = await fetch(url)
        const data = await response.json()
        this.setState({ artical: data.articles, totalResults: data.totalResults })
    }

    //   Next Page
    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=0e6505d592af40e09274e69a1f9c35c3&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                artical: parsedData.articles
            })
        }
    }
    //              Back Page
    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=0e6505d592af40e09274e69a1f9c35c3&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            artical: parsedData.articles
        })
    }

    render() {
        return (
            <>
                <div className='grid grid-cols-4 gap-4'>
                    {
                        this.state.artical.map((element) => {
                            return <Newsitem key={element.publishedAt} title={element.title} description={element.description} urlToImage={element.urlToImage} />
                        })
                    }
                </div>
                <div className='flex justify-center'>
                    <div className='my-10 w-1/2 flex justify-between'>
                        <button disabled={this.state.page <= 1} type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" onClick={this.handlePrevClick}>Back</button>
                        <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={this.handleNextClick}>Next</button>
                    </div>
                </div>
            </>
        )
    }
}
