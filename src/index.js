var Alert = function(message) {
  return new Promise(function(resolve) {
    var modal = weex.requireModule('modal');
    modal.alert(
      {
        message: message,
        okTitle: 'ok'
      },
      function() {
        resolve();
      }
    );
  });
};

Alert('start');

// alert('test alert');

import React from 'react';
import ReactWeex from './react-weex';

import App from './App';

ReactWeex.render(<App />);
