import React, { useState, useEffect } from 'react';

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

function App() {
  const [tag, setTag] = useState(false);

  function onClick() {
    setTag(!tag);
  }

  const style = {
    flex: 1,
    backgroundColor: tag ? 'red' : 'yellow',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={style} onClick={onClick}>
      <div
        style={{
          width: '250wx',
          height: '250wx',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <text style={{ fontSize: '28wx' }}>hello world</text>
      </div>
    </div>
  );
}

export default App;
