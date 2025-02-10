
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
      <select onChange={(e)=>{ setDefaulto(true)}}>
        <option > Please select one of the following funcitons</option>
        <option > y = Ax + B</option>
        <option > y = Ax^2 + B </option>
        <option onSelect={(e)=>{ setC(true)}}> y = Ax^2 + Bx + C</option>
      </select>
      <div>
      {defaulto ? (
      <div>
        <p>
          Please give A a value: <input placeholder='Default = 1' type='number'></input>
        </p>
        <p>
          Please give B a value: <input placeholder='Default = 0' type='number'></input>
        </p>
        { C ? (
          <p>Testing 1..2..3..</p>
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
