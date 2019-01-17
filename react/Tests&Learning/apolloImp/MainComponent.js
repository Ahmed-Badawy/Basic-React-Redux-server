import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';




import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, ApolloConsumer, Query } from 'react-apollo';

const client = new ApolloClient({ uri: "http://localhost:3000/graphql-new" });

//testing the query outside
client.query({
    query: gql`
        {
            passingArguments(num: 5),
            personFind1(minAge:44,maxAge:22){ user_name: fullName,age } 
        }
    `
}).then(res=>console.log(res));





class MainComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        console.log(this.myRef);
        let myVal = await new Promise( resolve=>setTimeout(_=>resolve("Await Sync Done"), 5000) );
        console.log(myVal);
    }

    handleChange(e){
        e.preventDefault();
        let value = e.target.value;
        this.props.dispatch( {type:"ActionOne",data:{field:value}} );
    }

    render() {
        return (
            <div className='container'>
                <h1>Apollo Implementation</h1>
                <ApolloProvider client={client}>
                    {/* you can do it using the ApolloCustomer Like this:-
                    <ApolloConsumer>
                        {client=>{
                            client.query({query:gql`{ passingArguments(num: 5) }`}).then(res=> console.log(res) );
                            return null;
                        }}
                    </ApolloConsumer> */}
                    {/* Or you can do it using the Query component directly */}
                    <Query query={gql`{ personFind1(minAge:44,maxAge:22){ user_name: fullName,age } }`}>
                        { ({data, loading, error})=>{
                            console.log("it's there",data);
                            if(!data.personFind1) console.log("it's empty",data);
                            if(loading) return <h1>Loading...</h1>
                            if(error) return <h1>Error Was Returned</h1>
                            return (<ul>
                                {data.personFind1.map( ({user_name,age},index)=>{
                                    return <li key={index}>{user_name} - {age}</li>
                                })}
                            </ul>)
                        } }
                    </Query>

                </ApolloProvider>
            </div>
        )
    }
}

MainComponent.propTypes = {
    // field: PropTypes.number.isRequired
//custom validators
    // field: function(props, propName, componentName){ if(props[propName]<5) throw new Error(`${propName} must be greater than 5`) }
}

export default connect((state, props) => {
    return {
        field: state.field,
    }
  })(MainComponent);
