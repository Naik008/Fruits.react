import React, { useState } from 'react';

function Counter(props) {
    const [count, setCount] = useState(props.initialCount || 0);

    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <div>
            <h1>Counter name: {props.name}</h1>
            <p>Count: {count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}

export default Counter;