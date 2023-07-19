import "./scss/AddressListItem.scss";
import { BiSolidPhoneCall, BiSolidMessageRoundedDetail} from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineRemoveCircle } from 'react-icons/md';
import { useContext, useEffect, useState } from "react";
import { AddressContext } from "./context/AddressContext";
import defaultImage from '../img/defaultImage.png';
import { Link } from "react-router-dom";
const AddressItem = ({profile}) => {
    const {visible,email,emailDNS,PhoneNumber,name} = profile;
    const {onClick,onRemove} = useContext(AddressContext);
    const [img,setImg] = useState(defaultImage);
    useEffect(()=>{
        const loadImge = async ()=>{
            try{
                const name = profile.img !== null ? profile.img : null;
                const response = (await import(`../img/${name}`)).default;
                setImg(response);
            }
            catch(err){
            }
        }
        loadImge();
    },[img])
    return (
        <div className="box">
            <div className="toggleBox" onClick={()=>onClick(profile.id)}>
                <img alt="img" src={img}></img>
                <span>&emsp;{name}</span>
            </div>
            <div className="moreBox" style={{display : visible ? 'block' : 'none'}} >
                <p>&emsp;Mobile :{PhoneNumber}</p>
                <p>&emsp;E-mail :&nbsp;{email}&nbsp;@&nbsp;{emailDNS}</p>
                <div className="buttonDiv">
                    <button className="call"><BiSolidPhoneCall/></button>
                    <button className="message"><BiSolidMessageRoundedDetail/></button>
                    <Link to={`/addAddress/${profile.id}`}><FiEdit/></Link>
                    <button className="remove" onClick={()=>onRemove(profile.id)}><MdOutlineRemoveCircle/></button>
                </div>
            </div>
            
        </div>
    )
}

export default AddressItem;