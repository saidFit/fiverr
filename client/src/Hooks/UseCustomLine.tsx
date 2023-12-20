import * as React from 'react';

interface IUseCustomLineProps {
    color:string
}

const UseCustomLine: React.FunctionComponent<IUseCustomLineProps> = (props) => {
 
    return (
        <div className={`btn ${props.color}`}>
    
        </div>
    );
};

export default UseCustomLine;
