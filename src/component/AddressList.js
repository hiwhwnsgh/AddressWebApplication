import './scss/AddressList.scss';
import AddressListItem from './AddressListItem';
import { useContext } from 'react';
import { AddressContext } from './context/AddressContext';

const AddressList = () => {
   const {inputEl,profiles} = useContext(AddressContext);
   
    return (
        <div >
           {
            profiles.filter((val)=>{
               if(inputEl === null){   // 검색창이 비어있다면
                  return val
               }
               else if(val.name.includes(inputEl)){   // 검색창에 해당하는 문자열이라면 true 아니라면 false
                  return val                          // true면 object 리턴
               }
            }).map((profile)=>
               <AddressListItem
                  profile={profile}
                  key={profile.id}
               />
            )
           }
        </div>
    )
  }

export default AddressList;
