import AddressList from './AddressList';
import AddressSearch from './AddressSearch';
import './scss/addAddress.scss';

const Address = () =>{
  
  return (
      <div>
        <AddressSearch/>
        <AddressList/>
      </div>
      
  )
};


export default Address;