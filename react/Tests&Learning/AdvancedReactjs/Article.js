import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

class Article extends PureComponent {
    dateDisplay(date){
        return new Date(date).toDateString();
    }
    
    componentWillUpdate = (nextProps, nextState) => {
        console.log(`... ${this.constructor.name} Component is updating... `);
    }

    render() {
        const { article, store } = this.props;
        const author = store.lookupAuthors(article.authorId);
        return (
            <div style={styles.article}>
                <div style={styles.title}>{article.title}</div>
                <div>{this.dateDisplay(article.date)}</div>
                <div><a href={author.website}>{author.firstName} {author.lastName}</a></div>
                <div>{article.body}</div>
            </div>
        );
    }
}

Article.propTypes= {
    article: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string
    })
}


const styles = {
    article:{
        margin: "14px",
        padding: "8px",
        color: "#444"
    },
    title:{
        border: "2px gray solid",
        paddingLeft: "8px",
        borderRadius: "10px",
        fontSize: "1.5em",
        color: "#333"
    }
}

export default Article;
