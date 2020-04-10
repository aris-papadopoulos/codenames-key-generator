import React, { useState } from 'react';
import main from '../assets/main.png';
import gr from '../assets/flags/greece.svg';
import uk from '../assets/flags/uk.svg';
import { texts } from '../texts';
import { history, createNewKey, encodeKey } from '../utilities';
import '../styles/app.scss';

function App() {
    
    const [lang, setLang] = useState('el');

    return (
        <div className="App">
            <header className="App-header">
                <div className="typewriter">
                    <code style={{animation: `typing 2.5s steps(${texts[lang].title.length * 2}, end), blink-caret .75s step-end infinite`}}>{texts[lang].title}</code>
                </div>
                <img src={main} className="image-logo" alt="logo" />
                <div className="actions">
                    <button className="create-key" onClick={() => createKey(lang)}>{texts[lang].createNew}</button>
                    <div className="language">
                        <p>{texts[lang].language}:</p>
                        <div>
                            <button onClick={() => setLang('el')}><img className={(lang === 'el') ? 'active' : ''} src={gr} alt="greek flag"/></button>
                            <button onClick={() => setLang('en')}><img className={(lang === 'en') ? 'active' : ''} src={uk} alt="uk flag"/></button>
                        </div>
                    </div>
                </div>
                <a className="about" href="https://github.com/aris-papadopoulos/codenames" rel="noopener noreferrer" target="_blank">{texts[lang].information}</a>
            </header>
        </div>
    );
}

const createKey = (lang) => {
    const encodedKey = createNewKey();
    const keyArray = encodeKey(encodedKey);
    console.log(keyArray);
    history.push(`/key/${lang}/${keyArray.encoded}`);
}

export default App;
