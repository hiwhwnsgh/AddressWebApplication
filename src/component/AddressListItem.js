import "./scss/AddressListItem.scss";
import keroro from "../img/keroro.jpg";
import { BiSolidPhoneCall, BiSolidMessageRoundedDetail} from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineRemoveCircle } from 'react-icons/md';


const AddressItem = ({profile,onClick}) => {
    const {id,text,visible} = profile;
    return (
        <div className="box" >
            <div className="toggleBox" onClick={()=>onClick(id)}>
                <img alt="img" src={keroro}></img>
                <span>&emsp;{profile.text}</span>
            </div>
            <div className="moreBox" style={{display : profile.visible ? 'block' : 'none'}} >
                <p>&emsp;Mobile :</p>
                <p>&emsp;E-mail :</p>
                <div className="buttonDiv">
                    <button className="call"><BiSolidPhoneCall/></button>
                    <button className="message"><BiSolidMessageRoundedDetail/></button>
                    <button className="edit"><FiEdit/></button>
                    <button className="remove"><MdOutlineRemoveCircle/></button>
                </div>
            </div>
            
        </div>
    )
}
export default AddressItem;