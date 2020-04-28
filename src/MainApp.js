import React, { Component } from 'react';
import Header from './components/Header';
import Options from './components/Options';
import Action from './components/Action';
import AddOption from './components/AddOption';
import OptionModal from './components/OptionModal';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleSelectedOption = this.handleSelectedOption.bind(this);
    this.state = {
      options: [],
      selectedOption: undefined
    };
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) { }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  handleAddOption(option) {
    if (!option) {
      return 'Enter a Valid Value';
    }
    else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists!'
    }

    this.setState((prevState) => {
      //prevState.options.push(option);
      return {
        options: prevState.options.concat([option])
      };
    });
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  }
  handleDelete = () => {
    this.setState(() => ({ options: [] }));
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }

  handleSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }
  render() {

    return (
      <div>
        <Header title="Random Picker" subtitle="The Random To-Do List" />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDelete={this.handleDelete}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>

        <OptionModal
          selectedOption={this.state.selectedOption}
          handleSelectedOption={this.handleSelectedOption}
        />
      </div>
    )
  }
}
