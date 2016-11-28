import React from 'react';

export default class extends React.Component {
  getChoice() {
    let choice = null;
    this.props.choices.map((item) => {
      if (item.value === this.props.value) {
        choice = item;
      }
    });
    return choice;
  }

  getIcon() {
    return this.getChoice().icon;
  }

  getLabel() {
    return this.getChoice().label;
  }

  /* jshint ignore:start */
  change = (value) => {
    return () => {
      this.props.onChange({
        target: {
          value: value
        }
      });
    };
  };
  /* jshint ignore:end */

  render() {
    /* jshint ignore:start */
    return <div className="btn-group btn-select-group">
      <button type="button"
              className="btn btn-select dropdown-toggle"
              id={this.props.id || null}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              aria-describedby={this.props['aria-describedby'] || null}
              disabled={this.props.disabled || false}>
        <span className="material-icon">
          {this.getIcon()}
        </span>
        {this.getLabel()}
      </button>
      <ul className="dropdown-menu">
        {this.props.choices.map((item, i) => {
          return <li key={i}>
            <button type="button" className="btn-link"
                    onClick={this.change(item.value)}>
              <span className="material-icon">
                {item.icon}
              </span>
              {item.label}
            </button>
          </li>;
        })}
      </ul>
    </div>;
    /* jshint ignore:end */
  }
}