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

try {
  alert('test alert');
} catch (error) {
  Alert(error.message);
}

import React from 'react';
import ReactWeex from './react-weex';

import App from './App';

ReactWeex.render(<App />);
