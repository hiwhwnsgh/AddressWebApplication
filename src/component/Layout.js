import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {MdAddReaction} from 'react-icons/md';
import {IoArrowBack} from 'react-icons/io5';
import './scss/Layout.scss';
import { useState } from 'react';


const Layout = () => {
    const navigate = useNavigate();
    const [isDisabled,setDisabled] = useState(`'block'`);
    const onClick = () =>{
        if(isDisabled === `'block'`){
            setDisabled(`'none'`)
        }
        else{
            setDisabled(`'block'`)
        }
    }
    const goBack = () =>{
        navigate('/');
    }
    return(
    <div className='Layout'>
        
        <div className='Title'>
            <button className='NewAddress' onClick={goBack}><IoArrowBack/></button>
            <div className='textTitle'>Address</div>
            <div style={{display:''}}>  
                <Link to="/addAddress" className='NewAddress backbutton' style={{display:'inline-block'}} onClick={onClick} ><MdAddReaction/></Link>
            </div>
        </div>
        <Outlet/>
        
    </div>
    )
}
export default Layout;