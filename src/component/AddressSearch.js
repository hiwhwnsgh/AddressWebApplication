import {GoSearch} from 'react-icons/go';
import './scss/AddressInput.scss';
import { AddressContext } from './context/AddressContext';
import { useContext } from 'react';
const AddressSearch = () =>{
    const {onChange} = useContext(AddressContext);
    return(
        <div className='Addressinput'>
            <span className='SearchIcon'><GoSearch/></span>
            <input placeholder='검색 할 이름 입력하세요.' onChange={(e)=>onChange(e)}/>
        </div>
    )
}

export default AddressSearch;