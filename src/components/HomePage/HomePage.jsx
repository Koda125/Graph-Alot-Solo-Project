
import useStore from '../../zustand/store'
import './HomePage.css'
import { useState } from 'react';


function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const [ defaulto, setDefaulto ] = useState(false)
  const [ C , setC ] = useState(false)
  const [ isChecked, setIsChecked ] = useState(false)
  const [ valueY, setValueY ] = useState('0')
  const [ valueX, setValueX ] = useState('0')

  function checkedBox(e) {
    console.log("What is isChecked set to: ", isChecked)
    setIsChecked(e.target.checked)
  }


  

  return (
    <>
    <div>
      <img src='https://placekeanu.com/400/400' className='placeholder'></img>
      
    </div>
      <select onChange={(e)=>{ 
        if(e.target.value === '0'){
          setDefaulto(false), setC(false)
        }
        else if( e.target.value === '1' ||  e.target.value === '2'){
          setDefaulto(true), setC(false)
        }
        else if(e.target.value === '3'){
            setC(true);
          
        }}}>
        <option value={'0'}> Please select one of the following funcitons</option>
        <option value={'1'}> y = Ax + B</option>
        <option value={'2'}> y = Ax&sup2; + B </option>
        <option value={'3'}> y = Ax&sup2; + Bx + C</option>
      </select>
      <div>
      {defaulto ? (
      <div>
        <p>
          Please give A a value: <input placeholder='Default = 1' type='number' />
        </p>
        <p>
          Please give B a value: <input 
          placeholder='Default = 0' type='number'
          />
          
        </p>
        { C ? (
          <p>Please give C a value: 
            <input placeholder='Default = 0' type='number'
            />
          </p>
        ) : (
          <p></p>
        )}
      </div>
      ) : (
        <p>Please make a selection to proceed.</p>
      )}
      </div>
      <div>
        <p> Please check box for more options.
        <input 
        type='checkbox'
        checked={isChecked}
        onChange={checkedBox}
        />
       
        </p>
        <div>
          <p>Find an exact value for Y? </p>
          <p>
            If X =
            </p>
            <input 
            type='number'
            placeholder='Value for X'
            onChange={(e)=>{setValueX(e.target.value)}}
            />
          
          <p>Y = { valueY }</p>
        </div>
        <div>
          <p>Find an exact value for X? </p>
          <p>
            If Y =
            </p>
            <input 
            type='number'
            placeholder='Value for Y'
            onChange={(e)=>{setValueY(e.target.value)}}
            />
          
          <p>X = { valueX }</p>
        </div>
      
      </div>
    </>
  );
}


export default HomePage;
