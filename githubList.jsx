const Card = (props) => {
	return (
  	<div>
      <img width="75" src={props.avatar_url}/>
      <div>
        <div>{props.name}</div>
        <div>{props.location}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
	return (
  	<div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
}

class Form extends React.Component {
	state= {
  	username: ''
  }
  
	submitHandler = (event) => {
  	event.preventDefault();
    axios.get('https://api.github.com/users/' + this.state.username)
    .then(resp => {
    	this.props.onSubmit(resp.data);
      this.setState({ username: ''})
    })
  }
  
  
	render() {
  	return(
    	<form onSubmit={this.submitHandler}>
      	<input type="text"
               value={this.state.username}
               onChange={(event) => {this.setState({username: event.target.value}) }}
               placeholder="Insert username"/>
        <button type="submit">Add card</button>
      </form>  
    );
  }
}

class App extends React.Component {
	state= {
  	cards: []
  };
  
  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }))
  };
  
	render() {
  	return(
    	<div>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}


ReactDOM.render(<App />, mountNode);