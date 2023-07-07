import { useCallback, useRef, useState } from 'react';
import Address from './component/Address'
import AddAddress from './component/addAddress';
import { Route, Routes } from 'react-router-dom';
import Layout from './component/Layout';
const App =() =>
{

  const nextId = useRef(3)
  const [names,setName] = useState([{
    id : 1,
    text : "Android"
  },
  {
    id: 2,
    text : "IOS"
  }]);
  const onInsert = useCallback(
    text => {
      const name = {
        id: nextId.current,
        text,
      };
      setName(names => names.concat(name));
      nextId.current+=1;
    }
    , [names],
  );
  return(
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Address/>}/>
        <Route path="/addAddress" element={<AddAddress/>}/>
      </Route>
    </Routes>

    
  )
}


export default App;
