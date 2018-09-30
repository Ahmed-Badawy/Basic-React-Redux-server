
// import rawData from "../../jsonData/react-blog-mockup-data.json";

class StateAPI{
    constructor(data){
        this.data = {
            articles: this.mapIntoObject(data.articles),
            authors: this.mapIntoObject(data.authors),
            searchTerm: '',
            timestamp: '',
        };
        this.subscriptions = {};
        this.lastSubscriptionID = 0;
    }
    mapIntoObject(arr){
        return arr.reduce( (acc,curr)=>{
            acc[curr.id] = curr;
            return acc;
        }, {});
    }


    lookupAuthors =  authorId=>this.data.authors[authorId];
    getState = _=>this.data;

    subscribe = callback =>{
        console.log("Subscribing");
        this.lastSubscriptionID++;
        this.subscriptions[this.lastSubscriptionID] = callback;
        return this.lastSubscriptionID++; 
    }
    unsubscribe = subscriptionID=>{ 
        console.log("UnSubscribing");
        delete this.subscriptions[subscriptionID];  
    }
    notifySubscribers = _=>{
        Object.values(this.subscriptions).forEach(callback=>callback());
        console.log("Notifying Subscribers");
    }

    mergeWithState = stateChange=>{
        this.data = {...this.data, ...stateChange};
        this.notifySubscribers();
    }
    

    setSearchTerm = searchTerm=>{
        console.log("Setting SearchTerm To: "+searchTerm);
        this.mergeWithState({searchTerm});
    }
    startClock = _=>{ setInterval( _=>this.mergeWithState({timestamp:new Date()}), 1000); }

}

export default StateAPI;




