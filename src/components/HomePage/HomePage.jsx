
import useStore from '../../zustand/store'
import './HomePage.css'
import { useState } from 'react';


function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const [ defaulto, setDefaulto ] = useState(false)
  const [ C , setC ] = useState(false)
  

  return (
    <>
    <div>
      <img src='https://placekeanu.com/400/400' className='placeholder'></img>
      
    </div>
      <select onChange={(e)=>{ 
        if(e.target.value === '0'){
          setDefaulto(false), setC(false)
        };
        if( e.target.value === '1' || '2'){
          setDefaulto(true), setC(false);
        if(e.target.value === '3'){
            setC(true);
          
        }}}}>
        <option value={'0'}> Please select one of the following funcitons</option>
        <option value={'1'}> y = Ax + B</option>
        <option value={'2'}> y = Ax^2 + B </option>
        <option value={'3'}> y = Ax^2 + Bx + C</option>
      </select>
      <div>
      {defaulto ? (
      <div>
        <p>
          Please give A a value: <input placeholder='Default = 1' type='number'></input>
        </p>
        <p>
          Please give B a value: <input 
          placeholder='Default = 0' type='number'
          >
          </input>
        </p>
        { C ? (
          <p>Please give C a value: 
            <input placeholder='Default = 0' type='number'
            >
            </input>
          </p>
        ) : (
          <p></p>
        )}
      </div>
      ) : (
        <p>Please make a selection to proceed.</p>
      )}
      </div>
    </>
  );
}


export default HomePage;
