import { useCallback, useRef, useState } from 'react';
import Component from './component/Address'
import AddressInsert from './component/Addressinsert';
import AddressList from './component/AddressList';
import AddressSearch from './component/AddressSearch';
const App =() =>
{
  const [names,setName] = useState([{
    id: 1,
    text: 'SAndroid',

  },
  
  ]);
  const nextId = useRef(1);
  const onInsert = useCallback(
    text => {
      const name = {
        id: nextId.current,
        text,
      };
      setName(names.concat(name));
      nextId.current+=1;
    }
    , [names],
  );
  return(
    <Component>
      <AddressInsert onInsert={onInsert}/>
      <AddressSearch/>
      <AddressList names={names}/>
    </Component>
  )
}


export default App;
