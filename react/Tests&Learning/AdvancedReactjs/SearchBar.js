import React, { PureComponent } from 'react';
import debounce from "lodash.debounce";

export default class SearchBar extends PureComponent {
  state= { searchTerm: '' } 
  
  doSearch = debounce(_=>{ this.props.doSearch(this.state.searchTerm) }, 500);
  handleSearchChange= event=>{
    this.setState({searchTerm: event.target.value}, _=>this.doSearch() );
  }

  //you can either use the shouldComponentUpdate() or just extend a PureComponent
  // shouldComponentUpdate(nextProps,nextState){ return this.state.searchTerm!=nextState.searchTerm; }
  componentWillUpdate(){
    console.log("SearchBar Component is Rendering...");
  }
  
  render() {
    return (
      <div>
        <input type="search" placeholder="Enter Search Term" value={this.state.searchTerm} onChange={this.handleSearchChange} />
      </div>
    )
  }
}
