import { useEffect, useRef, useState,useCallback } from 'react';
import { useLocation } from "react-router-dom";
import Address from './component/Address'
import AddAddress from './component/addAddress';
import { Route, Routes } from 'react-router-dom';
import Layout from './component/Layout';
import { AddressContext } from './component/context/AddressContext';
import axios from 'axios';


const App =() =>
{

  const nextId = useRef(1);
  const location = useLocation();
  const [profiles,setProfile] = useState([]);
  const [inputEl,setInputEl] = useState("");
  useEffect(()=>{
    const listSelect = async ()=>{
      try{
        await axios.get("/listSelect").then((res) => {
          const result =res.data.map((data)=>{
            const profile = {
              id : data.id,
              firstName : data.firstName,
              lastName : data.lastName,
              name : data.firstName+data.lastName,
              PhoneNumber : data.phonenumber,
              email : data.email,
              emailDNS : data.emailDNS,
              img : data.image || null,
            }
            return profile
          })
          setProfile(result);
          nextId.current = res.data.length+1;
          console.log("success")
        })
      }
      catch(err){
        console.log(err)
      }
    }
    listSelect();
  }
,[location])
  // 검색 input onChange
  const onChange = (e) =>{
    setInputEl(e.target.value)
  }

  const onClick = useCallback(
    id=>{
      setProfile(
        profiles.map(profile=>
          profile.id === id ? {...profile, visible: !profile.visible} : profile
        )
      )
    },[profiles]);

  const onRemove = useCallback( async id=>{
      const url = '/delete';
      await axios.delete(url,{data :{
        params_id : id,
      }}).then((res)=>console.log(res))
      .catch((err)=>console.log(err));
      setProfile(profiles.filter(profile=> profile.id!==id))
    },[profiles]);
  return(
    <AddressContext.Provider value={{onClick,onRemove,profiles,setProfile,inputEl,onChange}}>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Address/>}></Route>
        <Route path="/addAddress" element={<AddAddress/>}>
          <Route path=":id" element={<AddAddress/>}></Route>
        </Route>
      </Route>
    </Routes>
    </AddressContext.Provider>
  )
}
export default App;
