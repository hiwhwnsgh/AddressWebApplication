import './scss/AddressList.scss';
import AddressListItem from './AddressListItem';
import { useLocation } from "react-router-dom";



const AddressList = ({profiles, onClick}) => {

    return (
        <div>
           {
              profiles.map(profile=>
              <AddressListItem 
              profile={profile} 
              key={profile.id} 
              onClick={onClick}/>
              )
           }
        </div>
    )
  }


export default AddressList;
