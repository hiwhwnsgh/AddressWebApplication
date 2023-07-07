import { useCallback, useEffect, useRef, useState } from 'react';
import AddressList from './AddressList';
import AddressSearch from './AddressSearch';
import { useLocation } from 'react-router-dom';

const Address = () =>{
  const nextId = useRef(3);
  const location = useLocation();
  const state = location.state;
  const [profiles,setProfile] = useState([{
      id : 1,
      text : "Android",
      visible : false
    },
    {
      id: 2,
      text : "IOS",
      visible: false
    }]);
  
  useEffect(()=>{
    const profile = {
      id : nextId.current,
      firstName : '',
      lastName : '',
      job : '',
      firstNumber : '',
      middleNumber : '',
      lastNumber : '',
      visible: false,
    }
    setProfile(profiles.concat(profile));
    nextId.current += 1;
  },[state]);
  const onClick = useCallback(
    id=>{
      setProfile(
        profiles.map(profile=>
          profile.id === id ? {...profile, visible: !profile.visible} : profile
        )
      )
    },[profiles]);
  
  return (
      <div>
        <AddressSearch/>
        <AddressList profiles={profiles} onClick={onClick}/>
      </div>
      
  )
};


export default Address;