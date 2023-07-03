import './scss/ComponentTemplate.scss';

const Component = ({children}) =>{
    
    return (
        <div className='Component'>
            <div className='ComponentTitle'>Address</div>
            <div className='content'>{children}</div>
        </div>
    )
};


export default Component;