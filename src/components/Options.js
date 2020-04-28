import React, { Component } from 'react'
import OptionList from './OptionList'

export default class Option extends Component {
    handleAddOption(option) {
        this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    }

    render() {

        return (
            <div>
                <div className="widget-header">
                    <h3 className="widget-header__title">Your Options</h3>
                    <button
                        className="button button--link"
                        onClick={this.props.handleDelete}
                    >
                        Remove All
                </button>
                </div>
                {this.props.options.length === 0 && <p className="widget__message">Please provide an input to get started!</p>}
                {
                    this.props.options.map((options, index) => (
                        <OptionList
                            key={options}
                            optionText={options}
                            count={index + 1}
                            handleDeleteOption={this.props.handleDeleteOption}
                        />

                    ))
                }

            </div>
        )
    }
}
