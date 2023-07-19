import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {MdAddReaction} from 'react-icons/md';
import {IoArrowBack} from 'react-icons/io5';
import './scss/Layout.scss';


const Layout = () => {
    const navigate = useNavigate();
    const goBack = () =>{
        navigate('/');
    }
    return(
    <div className='Layout'>
        
        <div className='Title'>
            <button className='LayoutBtn' onClick={goBack}><IoArrowBack/></button>
            <div className='textTitle'>Address</div>
            <div style={{display:''}}>  
                <Link to="/addAddress" className='LayoutBtn'><MdAddReaction/></Link>
            </div>
        </div>
        <Outlet/>
        
    </div>
    )
}
export default Layout;