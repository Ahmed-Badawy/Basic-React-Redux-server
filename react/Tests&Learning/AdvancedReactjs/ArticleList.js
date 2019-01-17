import React, { Component, PureComponent } from 'react';
import Article from "./Article";

export default class ArticleList extends PureComponent {
  componentWillUpdate = (nextstate, nextState) => {
    console.log(`... ${this.constructor.name} Component is updating... `);
  }  
  
  render() {
    return (
      <div>
        <Comp1 className="class1" />
        <Comp3 />
        <a href='google.com'>Google Link</a>
        {Object.values(this.props.articles).map(article=>
            <Article key={article.id} article={article} store={this.props.store} />
        )}
      </div>
    )
  }
}



const Comp1 = _=> <p>COMP 1</p>;

export class Comp2 extends Component{
  render() { return this.props.hide ? null : <a href={this.props.address}>{this.props.text}</a> 
  }
}

export class Comp3 extends Component{
  state = {on: false, input: "", lifeCycle:"init" }
  componentDidMount(){ this.setState({lifeCycle: "cdm"}) }
  componentWillReceiveProps(){ this.setState({lifeCycle: "cwrp"}) }
  method1(val){ if(val=="one") return "two"; }
  render() { return <div>
      <p className="button-state">{this.state.on ? "Yes" : "No"}</p> 
      <button onClick={()=>this.setState({on: !this.state.on})}>Change State</button>

      <h2>{this.state.input}</h2>
      <input onChange={(e)=>this.setState({ input: e.currentTarget.value })} value={this.state.input} />

      <h3 className='lifeCycle'>{this.state.lifeCycle}</h3>
  </div> 
  }
}