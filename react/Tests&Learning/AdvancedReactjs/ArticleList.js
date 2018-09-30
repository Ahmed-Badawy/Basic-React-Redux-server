import React, { PureComponent } from 'react';
import Article from "./Article";

export default class ArticleList extends PureComponent {
  componentWillUpdate = (nextProps, nextState) => {
    console.log(`... ${this.constructor.name} Component is updating... `);
  }  
  
  render() {
    return (
      <div>
        {Object.values(this.props.articles).map(article=>
            <Article key={article.id} article={article} store={this.props.store} />
        )}
      </div>
    )
  }
}
