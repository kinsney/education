import React from 'react';

export default class extends React.Component {
  getClassName() {
    if (this.props.thread.is_read) {
      return 'read-status item-read';
    } else {
      return 'read-status item-new';
    }
  }

  getTitle() {
    if (this.props.thread.is_read) {
      return gettext("This thread has no new posts.");
    } else {
      return gettext("This thread has new posts.");
    }
  }

  getIcon() {
    if (this.props.thread.is_read) {
      return 'chat_bubble_outline';
    } else {
      return 'chat_bubble';
    }
  }

  getUrl() {
      if (this.props.thread.is_read) {
        return this.props.thread.url.last_post;
      } else {
        return this.props.thread.url.new_post;
      }
  }

  render() {
    /* jshint ignore:start */
    return <a className={this.getClassName()} href={this.getUrl()} title={this.getTitle()}>
      <span className="material-icon">
        {this.getIcon()}
      </span>
    </a>;
    /* jshint ignore:end */
  }
}