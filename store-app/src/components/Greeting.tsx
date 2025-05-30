import { useState } from 'react';

const Greeting = () => {
    const [name, setName] = useState('');

    return (
        <div>
          <input
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <p data-testid="greeting">{name ? `Hello, ${name}!` : 'Hello!'}</p>
        </div>
      );
    };


    export default Greeting;