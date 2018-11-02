import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import friends from "./friends.json";
import Column from "./Column";
import Row from "./Row";
import Container from "./Container";
import "./App.css";

function shuffleFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };
  
  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "You've lost your friends!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledFriends = shuffleFriends(friends);
    this.setState({ friends: shuffledFriends });
  };
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Navbar
          title="Friends Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />

        <Title>
          Try to click on every friend once, without repeating.
        </Title>

        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-6">
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={friend.id}
                  image={friend.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
