import React from 'react';
import zxcvbn from 'misago/services/zxcvbn';

export const STYLES = [
  'progress-bar-danger',
  'progress-bar-warning',
  'progress-bar-warning',
  'progress-bar-primary',
  'progress-bar-success'
];

export const LABELS = [
  gettext("Entered password is very weak."),
  gettext("Entered password is weak."),
  gettext("Entered password is average."),
  gettext("Entered password is strong."),
  gettext("Entered password is very strong.")
];

export default class extends React.Component {
  constructor(props) {
    super(props);

    this._score = 0;
    this._password = null;
    this._inputs = [];
  }

  getScore(password, inputs) {
    let cacheStale = false;

    if (password.trim() !== this._password) {
      cacheStale = true;
    }

    if (inputs.length !== this._inputs.length) {
      cacheStale = true;
    } else {
      inputs.map((value, i) => {
        if (value.trim() !== this._inputs[i]) {
          cacheStale = true;
        }
      });
    }

    if (cacheStale) {
      this._score = zxcvbn.scorePassword(password, inputs);
      this._password = password.trim();
      this._inputs = inputs.map(function(value) {
        return value.trim();
      });
    }

    return this._score;
  }

  render() {
    /* jshint ignore:start */
    let score = this.getScore(this.props.password, this.props.inputs);

    return <div className="help-block password-strength">
      <div className="progress">
        <div className={"progress-bar " + STYLES[score]}
             style={{width: (20 + (20 * score)) + '%'}}
             role="progress-bar"
             aria-valuenow={score}
             aria-valuemin="0"
             aria-valuemax="4">
          <span className="sr-only">
            {LABELS[score]}
          </span>
        </div>
      </div>
      <p className="text-small">
        {LABELS[score]}
      </p>
    </div>;
    /* jshint ignore:end */
  }
}