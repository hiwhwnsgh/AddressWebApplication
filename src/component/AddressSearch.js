import {GoSearch} from 'react-icons/go';
import './scss/AddressInput.scss';

const AddressSearch = () =>{
    return(
        <form className='Addressinput'>
            <input placeholder='검색 할 이름 입력하세요.' />
            <button type='submit'>
                <GoSearch/>
            </button>
        </form>
    )
}

export default AddressSearch;