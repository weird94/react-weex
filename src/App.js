import React, { useState } from 'react';

function App() {
  const [tag, setTag] = useState(false);
  function onClick() {
    setTag(!tag);
  }

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: tag ? 'red' : 'yellow',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClick}
    >
      <div
        style={{
          width: '250wx',
          height: '250wx',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <text style={{ fontSize: '28wx' }}>
          hello world
        </text>
      </div>
    </div>
  );
}

export default App;
