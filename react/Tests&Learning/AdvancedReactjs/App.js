import React,{Component} from 'react';
import ArticleList from "./ArticleList";
import axios from "axios";

// import {data} from "jsonData/react-blog-mockup-data.json";
import StateAPI from "server/api/StateAPI";
// const api = new DataAPI(data);
import pickby from "lodash.pickby";

import SearchBar from "./SearchBar";
import TimeStamp from './TimeStamp';


class App extends Component{
    state = this.props.store.getState();
    constructor(props){
        super(props);
    }

    asyncFunc = ()=>{return Promise.resolve("Ahmed Badawy"); }
    async componentDidMount(){
        // this.setState({ name: await this.asyncFunc() })

        // const rawData = await axios.get("/api/articlesApi");
        // const api = new DataAPI(rawData.data);
        // this.setState(prevState=>({
        //     articles: api.getArticles(),
        //     authors: api.getAuthors()            
        // }))

        this.subscriptionID = this.props.store.subscribe(_=>{
            this.setState(this.props.store.getState()) 
        });
        this.props.store.startClock();    
    }
    componentWillUnMount(){
        this.props.store.unsubscribe(this.subscriptionID);
        this.subscriptionID = null;
    }

    //update when store state changes:- so you need to subscribe for changes in the store... 
    componentWillUpdate = (nextProps, nextState) => {
      console.log(`... ${this.constructor.name} Component is updating... `);
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        console.log(nextState,this.state);
        return nextState.searchTerm!=this.state.searchTerm
                ||nextState.timestamp!=this.state.timestamp;
    //   return nextState.articles!=this.state.articles ||
    //             nextState.searchTerm!=this.state.searchTerm
    //             nextState.timestamp!=this.state.timestamp
        return true;
    }
    
    


    render(){
        let {articles, searchTerm} = this.state;
        //we can't filter an object. so we are going to use a lib for that.
        if(this.state.searchTerm){
            const searchRE = new RegExp(searchTerm,'i') 
            articles = pickby(articles, (val,key)=>{
                return val.title.match(searchRE) || val.body.match(searchRE)
            })
        }
        return <div>
                    <h2>Hello Class Components, Name: {this.state.name}</h2>
                    <TimeStamp state={this.state} />
                    <SearchBar doSearch={this.props.store.setSearchTerm} />
                    <ArticleList articles={articles} store={this.props.store} />

        </div>
    }
}


export default App;