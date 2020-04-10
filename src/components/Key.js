import React from 'react';
import '../styles/key.scss';



const Key = (props) => {

    const { keyMap } = props;

    console.log(keyMap);


    return (
        <div className="key-wrapper">
            {(keyMap.array) ?
                <div className="key">
                    <div className="key__outer">
                            <div className="key__inner">
                                {keyMap.array.map((el, i) => {
                                        let classValue;
                                        if      (el === 1) { classValue = 'blue' }
                                        else if (el === 2) { classValue = 'red' }
                                        else if (el === 3) { classValue = 'neutral' }
                                        else if (el === 4) { classValue = 'executor' }
                                    return <span key={i} className={`key-element ${classValue}`}></span>
                                })}
                                <span className={`indicator ${keyMap.init} top`}></span>
                                <span className={`indicator ${keyMap.init} bottom`}></span>
                                <span className={`indicator ${keyMap.init} left`}></span>
                                <span className={`indicator ${keyMap.init} right`}></span>
                            </div>
                    </div>
                </div>
            : null}
        </div>
    );
}

export default Key;
