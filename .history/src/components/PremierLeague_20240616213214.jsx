import React, { useEffect } from 'react';

const MyComponent = (props) => {
    useEffect(() => {
        console.log('Component props:', props);
    }, [props]); // props が変更されたときにログを出力する

    return (
        <div>
            <h1>My Component</h1>
            <p>Props value: {props.id}</p>
        </div>
    );
};

export default MyComponent;
