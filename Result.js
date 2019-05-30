import React from 'react';



export default class Result extends React.Component{
    render(){
        return(
          <div className="alert alert-primary" role="alert">
            You've clicked{this.setState({...user})};
          </div>
        );
    }
}