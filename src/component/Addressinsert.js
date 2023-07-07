import {MdAdd} from 'react-icons/md';
import { useCallback,useState } from 'react';
import './scss/AddressInput.scss';

const AddressInsert = ({onInsert}) => {
    const [value,setValue] = useState('');

    const onChange = useCallback(e=>{
        setValue(e.target.value);
    },[])

    const onSubmit = useCallback(e=>{
        onInsert(value);
        setValue('');
        e.preventDefault(); // 새로고침을 방지하고자 이 함수를 호출
        console.log(value);
    },[onInsert,value]);

    return (
        <form className='Addressinput' onSubmit={onSubmit}>
            <input placeholder='추가 할 이름 입력하세요.' onChange={onChange}/>
            <button type='submit'>
                <MdAdd/>
            </button>
        </form>
    )
}

export default AddressInsert;