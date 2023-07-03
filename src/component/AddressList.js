import './scss/AddressList.scss';
import AddressListItem from './AddressListItem';
import * as ReactDOM from 'react-dom';
import React from 'react';
import { useRef } from 'react';
const AddressList = ({names}) => {
    const alphabet = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 65));
    const value = names[0].text || undefined;
    const firstName = value?.slice(0,1).toUpperCase();
    const indexRuf = useRef(alphabet);
    const ListItem = () =>{
        for(var i=0;i<alphabet.length+names.length;i++){
            <div className='box' key={alphabet[i]}></div>
        }
    }
    // isAlpha(alphabet,firstName,first)
    return(
        <div className='box'></div>
    )
}

export default AddressList;
