import './scss/addPage.scss';
import { useState, useCallback,useRef, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {IoAddCircleSharp} from 'react-icons/io5';
import {HiXCircle} from 'react-icons/hi';
import reducer from './useInputs';
import axios from 'axios';

const AddPage = () => {
    let paramas = useParams();
    useEffect(()=>{
        if(paramas.id !== undefined){
            axios.get('/readData',{params: {id : paramas.id}})
            .then((res)=>{
                const loadData = res.data[0];
                console.log(loadData);
                setEmail(loadData.emailDNS);
                uploadData('firstName',loadData.firstName);
                uploadData('lastName',loadData.lastName);
                uploadData('job',loadData.job);
                uploadData('email',loadData.email);
                const loadImge = async ()=>{
                    try{
                        const name = loadData.image !== null ? loadData.image : null;
                        const response = (await import(`../img/${name}`)).default;
                        setImg(response);
                    }
                    catch(err){
                    }
                }
                loadImge();
                let phone = loadData.phonenumber.split(",");
                phone = phone.map(data=>{
                    const number = {
                        id: nextId.current,
                        phonenumber : data,
                    }
                    nextId.current+=1;
                    return number;
                })
                setAddPhoneNumber(phone);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },[])
    //상수

    const emailArray = ["daum.net","empal.com","gmail.com","hanmain.net","msn.com","naver.com","nate.com"];
    
    // 상태 변수
    const initalState = {
        firstName: '',
        lastName : '',
        job : '',
    }
    const nextId = useRef(1);
    const [emailDNS,setEmail] = useState("");
    const [addPhoneNumber,setAddPhoneNumber] = useState([])
    const [imgSrc,setImgSrc] = useState();
    const [img,setImg] = useState();
    const [inputs,dispatch] = useReducer(reducer,initalState)
    const {firstName, lastName, job, email} = inputs;       // 비구조화 할당을 통해 추출
    const {phonenumber} = addPhoneNumber;
    let inputRef;
    const navigate = useNavigate();

    // 사진 추가 버튼 이벤트
    const imgChange = useCallback((e)=>{
        const file = e.target.files[0];
        setImgSrc(e.target.files[0])
        const fileReader = new FileReader();
        if(file){
            fileReader.readAsDataURL(file);
            
        }
        
        fileReader.onload = () => {
            setImg(fileReader.result);
        }
    },[img]);

    // 전화번호 추가 이벤트
    const onClick = useCallback(()=>{
        const phone = {
            id : nextId.current,
        }
        setAddPhoneNumber([...addPhoneNumber,phone]);
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

    // inpust 상태 관리
    const inputsChange = useCallback((e) =>{
        const { name, value } = e.target;
        dispatch({
            type: 'INPUTS_CHANGE',
            name,
            value
        });
  }, []);
    const uploadData = (name,value) =>{
        dispatch({
            type: 'INPUTS_CHANGE',
            name,
            value
        })
    }
    // 전화번호 관리
    const phoneChage = useCallback((e,element)=>{
        const {name,value} = e.target;
        setAddPhoneNumber(
            addPhoneNumber.map(phone=>
            phone.id === element.id ? {...phone, [name]: value } : phone
            )
        );
    }
    ,[addPhoneNumber]);

    // 저장 버튼 클릭 시 이벤트
    const saveAddress = useCallback(async () =>{
        try{
        var imageName
        let phonenumber='';
        addPhoneNumber.map(phone=>{
            return phonenumber += `${phone.phonenumber},`;
        })
        const formData = new FormData();
        formData.append("img",imgSrc);
        phonenumber = phonenumber.substring(0,phonenumber.length-1);
        
        axios.post('/upload',formData).then((res)=>{
            imageName = res.data;
            const url = '/insert'
            const data = {
                firstName : firstName,
                lastName : lastName,
                job : job,
                phonenumber : phonenumber,
                email : email,
                emailDNS : emailDNS,
                img : imageName,
            }
            const config = {"Content-type": 'application/json'}
            axios.post(url,data,config).then((res)=>{
                console.log(`res : ${res}`)
            }).catch((err)=>{
                console.log(`err: ${err}`)
            })
            navigate("/",{state:{inputs:inputs,phonenumber:addPhoneNumber,image:imageName}});
        }).catch((err)=>{
            console.log(err);
        });
        
        }
        catch(err){
            console.log(err);
        }
    })
    const updateData = useCallback(async() =>{
        try{
            var imageName;
            let phonenumber='';
            addPhoneNumber.map(phone=>{
                return phonenumber += `${phone.phonenumber},`;
            })
            const formData = new FormData();
            formData.append("img",imgSrc);
            phonenumber = phonenumber.substring(0,phonenumber.length-1);
            axios.post('/upload',formData).then((res)=>{
                imageName = res.data;
                const url = `/update`;
                const data = {
                    id : paramas.id,
                    firstName : firstName,
                    lastName : lastName,
                    job : job,
                    phonenumber : phonenumber,
                    email : email,
                    emailDNS : emailDNS,
                    img : imageName,
                }
                axios.put(url,data).then((res)=>{
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
                navigate("/",{state:{inputs:inputs,phonenumber:addPhoneNumber,image:imageName}});
            }).catch((err)=>{
                console.log(err);
            });
            
            }
            catch(err){
                console.log(err);
            }
    })
    
    
    return(
        <div className="addPage">
            <div className='vertical' >
                <img src={img} onClick={()=>inputRef.click()} ></img>
                <input type="file" accept='image/*'style={{display:"none"}} ref={refParm=>inputRef=refParm} onChange={e=>imgChange(e) }></input>
                <button className='imgbutton' onClick={()=>inputRef.click()}>사진 추가</button>
            </div>
            <div className='vertical'>
                <input type="text" name='firstName' placeholder='성' value={firstName || ""} onChange={inputsChange}></input>
                <input type='text' name ='lastName' placeholder='이름' value={lastName || ""} onChange={inputsChange}></input>
                <input type="text" name = 'job' placeholder='직장' value={job || ""} onChange={inputsChange}></input>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop: '20px'}}>
                <div onClick={onClick} className='plusbutton'><IoAddCircleSharp/>
                <div className='font_style'>&emsp;전화번호 추가</div>
                </div>
            </div>

            <div className='phone'>
                {
                addPhoneNumber.map((phone)=>(
                    <div key={phone.id} className='phoneList'>
                        <input type="tel" key={`input${phone.id}`} size="18" placeholder="'-' 없이 작성" name="phonenumber" value={phonenumber} defaultValue={phone.phonenumber} onChange={(e)=>phoneChage(e,phone)}></input>
                        <button  className="remove"key={"button"+phone.id} onClick={()=>onRemove(phone.id)}><HiXCircle/></button>
                    </div>
                ))
            }

            </div>
            <div className='vertical'>
                <div className='email'>
                    <input type="text"  name='email'size="7" placeholder='Email' value={email || ""} onChange={inputsChange}></input> @
                    <input type="email"  name="emailaddr" size="7" defaultValue={emailDNS} onChange={onChange}></input>
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
                <button onClick={paramas.id === undefined ? saveAddress : updateData}>저&ensp;장</button>
            </div>
        </div>
    )
}

export default AddPage;