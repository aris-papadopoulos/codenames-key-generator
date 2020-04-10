// Needed for passing history object and create redirects within redux actions
import createHashHistory from 'history/createHashHistory';
export const history = createHashHistory();


export function decodeBase64(string) {
    const decodedString = window.atob(string);
    const parsedValue = JSON.parse(decodedString);
    return parsedValue;
}


// Encodes picked cards and starts a new game
export function encodeKey() {

    let key = createNewKey();

    var myJSON = JSON.stringify(key);
    const encoded = window.btoa(myJSON);
    key = {...key, encoded}

    return key;
}


export function createNewKey() {
    // Define which team starts
    let  keyArray = [];
    const initNumber = Math.floor(Math.random() * 2);
    const initiator = (initNumber) ? 'blue' : 'red';

    // Create array of elements
    // "arr" has 8 blue cards, 8 red, 7 neutral and 1 executor card. 
    let elemsArray = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4];
    // The last card depends on which team starts first (team who starts first has 1 more card)
    (initiator === 'blue') ? elemsArray.push(1) : elemsArray.push(2);

    // Create random map array
    while (keyArray.length < 25) {
        const index = Math.floor(Math.random() * elemsArray.length);
        keyArray.push(elemsArray[index]);
        elemsArray.splice(index, 1);
    }

    const keyObject = {
        array: keyArray,
        init: initiator
    }

    return keyObject;
}