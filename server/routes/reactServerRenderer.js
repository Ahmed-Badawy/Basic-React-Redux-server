import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";

import StateAPI from "server/api/StateAPI";
import App from "react/Tests&Learning/AdvancedReactjs/App";



const serverRender = async ()=>{
    const rawData = await axios.get("http://localhost:3000/api/articlesApi");
    const store = new StateAPI(rawData.data);
    console.log("---------------------init-----------------------------------------")
    
    /*
        because we are loading the data in both backend & frontend again for the server render to work. 
        instead we can just pass the initData to the frontend using the Window object.
    */
    return {
        markup: ReactDOMServer.renderToString(<App store={store} />),
        initData: rawData.data,
        store
    }
}

export default serverRender;



