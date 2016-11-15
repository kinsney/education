import React from 'react'; // jshint ignore:line
import ReactDOM from 'react-dom'; // jshint ignore:line
import { PollForm } from 'misago/components/poll'; // jshint ignore:line
import PostingComponent from 'misago/components/posting'; // jshint ignore:line
import mount from 'misago/utils/mount-component'; // jshint ignore:line

export class Posting {
  init(ajax, snackbar, placeholder) {
    this._ajax = ajax;
    this._snackbar = snackbar;
    this._placeholder = $(placeholder);

    this._isOpen = false;
    this._isClosing = false;
  }

  open(props) {
    if (this._isOpen === false) {
      this._isOpen = props.config;
      this._realOpen(props);
    } else if (this._isOpen !== props.config) {
      let message = gettext("You are already working on other message. Do you want to discard it?");
      if (this._isOpen.config.mode == 'POLL') {
        message = gettext("You are already working on poll. Do you want to discard it?");
      }

      const changeForm = confirm(message);
      if (changeForm) {
        this._isOpen = props.config;
        this._realOpen(props);
      }
    }
  }

  // jshint ignore:start
  _realOpen(props) {
    if (props.config.mode == 'POLL') {
      mount(
        <PollForm {...props} />,
        'posting-mount'
      );
    } else {
      mount(
        <PostingComponent {...props} />,
        'posting-mount'
      );
    }

    this._placeholder.addClass('slide-in');

    $('html, body').animate({
      scrollTop: this._placeholder.offset().top
    }, 1000);
  }

  close = () => {
    if (this._isOpen && !this._isClosing) {
      this._isClosing = true;
      this._placeholder.removeClass('slide-in');

      window.setTimeout(() => {
        ReactDOM.unmountComponentAtNode(document.getElementById('posting-mount'));
        this._isClosing = false;
        this._isOpen = false;
      }, 300);
    }
  };
  // jshint ignore:end
}

export default new Posting();
