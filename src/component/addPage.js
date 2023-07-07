import './scss/addPage.scss';
import { useState, useCallback,useRef, useEffect, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
import {IoAddCircleSharp} from 'react-icons/io5';
import {HiXCircle} from 'react-icons/hi';
import reducer from './useInputs';


const AddPage = (props) => {
    //상수
    const PhoneNumber = [
        "010","02","031","032","033","041","042","043","044","051","052","053","054","055","061","062","063","064"
    ];
    const emailArray = ["daum.net","empal.com","gmail.com","hanmain.net","msn.com","naver.com","nate.com"];
    const defaultImge = '../img/defaultImage.png';
    
    // 상태 변수
    const initalState = {
        firstName: '',
        lastName : '',
        job : '',
    }
    const nextId = useRef(1);
    const [emailDNS,setEmail] = useState("");
    const [addPhoneNumber,setAddPhoneNumber] = useState([{
        id : 0,
        firstNumber : '',
        middleNumber : '',
        lastNumber : ''
    }])
    const [imgSrc,setImgSrc] = useState();
    const [inputs,dispatch] = useReducer(reducer,initalState)
    
    const {firstName, lastName, job} = inputs;       // 비구조화 할당을 통해 추출
    const {firstNumber,middleNumber,lastNumber} = addPhoneNumber;

    let inputRef;
    const navigate = useNavigate();


    // 사진 추가 버튼 이벤트
    const imgChange = useCallback((e)=>{
        const file = e.target.files[0];
        const fileReader = new FileReader();
        if(file){
            fileReader.readAsDataURL(file);
        }
        fileReader.onload = () => {
            setImgSrc(fileReader.result);
        }
    },[imgSrc]);

    // 전화번호 추가 이벤트
    const onClick = useCallback(()=>{
        const phone = {
            id : nextId.current,
            firstNumber : '',
            middleNumber : '',
            lastNumber : ''
        }
        setAddPhoneNumber(addPhoneNumber.concat(phone));
        nextId.current+=1;

    },[addPhoneNumber]);

    // 전화번호 selection 삭제 이벤트
    const onRemove = useCallback(
        id =>{
            setAddPhoneNumber(addPhoneNumber.filter(phone=>phone.id !== id))
        },
        [addPhoneNumber]
    )

    // 이메일 selection 요소 클릭 시 이벤트
    const onChange = useCallback((e) =>{
        setEmail(e.target.value)
    },[emailDNS])

    // 저장 버튼 클릭 시 이벤트
    const saveAddress = () =>{
        navigate("/", {state: addPhoneNumber,inputs});
    }

    // inpust 상태 관리
    const inputsChange = useCallback((e) =>{
        const { name, value } = e.target;
        dispatch({
            type: 'INPUTS_CHANGE',
            name,
            value
        });
  }, []);
    // 전화번호 관리
    const phoneChage = useCallback((e,element)=>{
        const {name,value} = e.target;
        
        setAddPhoneNumber(
            addPhoneNumber.map(phone=>
            phone.id === element.id ? {...phone, [name]: value } : phone
            )
        );
    }
    ,[addPhoneNumber])
    
    
    return(
        <div className="addPage">
            <div className='vertical' >
                <img src={imgSrc} onClick={()=>inputRef.click()} ></img>
                <input type="file" accept='image/*'style={{display:"none"}} ref={refParm=>inputRef=refParm} onChange={e=>imgChange(e) }></input>
                <button className='imgbutton' onClick={()=>inputRef.click()}>사진 추가</button>
            </div>
            <div className='vertical'>
                <input type="text" name='firstName' placeholder='성' value={firstName || ""} onChange={inputsChange}></input>
                <input type='text' name ='lastName' placeholder='이름' value={lastName || ""} onChange={inputsChange}></input>
                <input type="text" name = 'job' placeholder='직장' value={job || ""} onChange={inputsChange}></input>
            </div>
            <p></p>
            <div onClick={onClick} className='plusbutton'><IoAddCircleSharp/>
            <div className='font_style'>&emsp;전화번호 추가</div>
            </div>
            
            <div className='phone'>
                {
                addPhoneNumber.map((phone)=>(
                    <div key={phone.id} className='phoneList'>
                        <select name='firstNumber' size='1' key={"select"+phone.id} defaultValue='010' value={firstNumber} onChange={(e)=>phoneChage(e,phone)}>
                        {
                            PhoneNumber.map(number=>{
                                return <option key={phone.id+`${number}`} value={number}>{number}</option>
                            })
                        }
                        </select>
                        -
                        <input type="tel" size="1" key={"tel1"+phone.id} name='middleNumber' value={middleNumber} onChange={(e)=>phoneChage(e,phone)}></input>
                        -
                        <input type="tel" size="1" key={"tel2"+phone.id} name='lastNumber' value={lastNumber} onChange={(e)=>phoneChage(e,phone)}></input> 
                        <button  className="remove"key={"button"+phone.id} onClick={()=>onRemove(phone.id)}><HiXCircle/></button>
                    </div>
                ))
            }

            </div>
            <div className='vertical'>
                <div className='email'>
                    <input type="text" size="7" placeholder='Email'></input> @
                    <input type="email" size="7" defaultValue={emailDNS}></input>
                    <select name="emailaddr" onChange={onChange}>
                        <option >직접입력</option>
                        {
                            emailArray.map(value=>{
                                return <option value={value} key={value}>{value}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='footer'>
                <button onClick={saveAddress}>저&ensp;장</button>
            </div>
        </div>
    )
}

export default AddPage;