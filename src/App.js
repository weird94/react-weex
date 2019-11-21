import React, { useState } from 'react';

function Demo() {
  return (
    <div
      style={{
        width: '250wx',
        height: '250wx',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <text style={{ fontSize: 28 }}>hello world</text>
    </div>
  );
}

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
      <Demo />
    </div>
  );
}

export default App;
