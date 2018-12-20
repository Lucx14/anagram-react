import React, { Component } from 'react';
import './App.css';

const API = 'http://codekata.com/data/wordlist.txt';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        dataSet: [],
        isLoading: false,
        error: null,
        word: '',
      }
    }


  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .then(data => this.setState({
        dataSet: data.split('\n'),
        isLoading: false,
      }))
      .catch(error => this.setState({ error, isLoading: false }));
  }



  getAnagrams = (word) => {
    let result = [];
    let sortedWord = this.formatWord(word);
  
    for (let i = 0; i < this.state.dataSet.length; i += 1) {
      if (this.formatWord(this.state.dataSet[i]) === sortedWord && this.state.dataSet[i].toLowerCase() !== word.toLowerCase()) {
        result.push(this.state.dataSet[i]);
      }
    }
    if (result.length < 1 && word.length === 0) return 'Please enter a word to find its anagram!'
    if (result.length < 1 && word.length > 0) return `There are no anagrams of ${word}`;
    return `${word} has the following anagrams: ${result.join(', ')}`;
  }


  formatWord = (word) => {
    return word
      .replace(/['-]/g, '')
      .toLowerCase()
      .split('')
      .sort()
      .join('');
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      word: event.target.value,
    });
  }



  render() {
    const { isLoading, error } = this.state;

    if (error) return <p>{error.message}</p>
    if (isLoading) return <p>Loading...</p>
    
    return (
      <div className="App">
        <h1>Anagram Generator</h1>
        <input
              type="text"
              placeholder="word..."
              value={this.state.search}
              onChange={this.handleSearch} />
        <p>{this.getAnagrams(this.state.word)}</p>
      </div>
    );
  }
}

export default App;
