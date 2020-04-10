import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { history, decodeBase64, createNewKey } from '../utilities';
import { texts } from '../texts';
import Key from './Key';
import '../styles/game.scss';

const Game = (props) => {
    
    const { addToast } = useToasts();
    
    const initialKey = {encoded: ''};

    const [key, setKey] = useState(initialKey);
    const { lang, id } = props.match.params;
    const prevID = usePrevious(id);

    useEffect(() => {
        const { id } = props.match.params;
        if (prevID !== id) {
            const keyArray = decodeBase64(id);
            console.log(keyArray)
            setKey(keyArray);
        }
    }, [props.match.params, prevID]);
    
    const createKey = () => {
        let key = createNewKey();

        var myJSON = JSON.stringify(key);
        const encoded = window.btoa(myJSON);
        key = {...key, encoded}
        console.log(key);
        history.push(`/key/${lang}/${key.encoded}`);

        setKey(key);
    }

    const copyToClipboard = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            addToast(texts[lang].copyURLsuccess, { appearance: 'success', autoDismiss: true })
        }
        catch(err) {
            addToast(texts[lang].copyURLfail, { appearance: 'error' })
        }
    }

    return (
        <div className="App">
            <header className="Game-header">
                <Link className="link" to={'/'}>{texts[lang].homepage}</Link>
                <div>
                    <button onClick={() => createKey(lang)}>{texts[lang].createNew}</button>
                    <button onClick={() => copyToClipboard()}>{texts[lang].copyURL}</button>
                </div>
            </header>
            <main>
                <Key lang={lang} keyMap={key} />
            </main>
        </div>
    );
}

// Hook - Used to keep prevProps on functional components
function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

export default Game;
