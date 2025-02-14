
import useStore from '../../zustand/store'
import './HomePage.css'
import { useState } from 'react';


function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const [ defaulto, setDefaulto ] = useState(false)
  const [ C , setC ] = useState(false)
  const [ isChecked, setIsChecked ] = useState(false)
  const [ valueA, setValueA ] = useState(1)
  const [ valueB, setValueB ] = useState(0)
  const [ valueC, setValueC ] = useState(0)
  const [ valueY, setValueY ] = useState(0)
  const [ valueX, setValueX ] = useState(0)
  const [ roots, setRoots ] = useState([])
  const [ showing, setShowing ] = useState(true)
  const [ functionOption, setFunctionOption ] = useState('')

  function checkedBox(e) {
    console.log("What is isChecked set to: ", isChecked)
    setIsChecked(e.target.checked)
  }

  function findY(){
    //This function will be used to find the value of Y depending on the selected function option.
    
    console.log('What function am I using? ', functionOption)
    if (functionOption === '1'){
      console.log('function base selected is: aX + b')
      setValueY( Number( (valueA * valueX) + valueB ) )
      
    } else if ( functionOption === '2'){
      setValueY( (valueA * (valueX**2)) + valueB )
    } else if ( functionOption === '3'){
      setValueY( ( valueA * (valueX**2)) + (valueB * valueX) + valueC)
    } else {
      alert("Please make a selection so we can calculate the values for you.")
    }
    console.log( "The calculated value for Y is: ", valueY)
  }

  function findX(){
    console.log('What function am I using? ', functionOption)
    let solutionOne = 0
    let solutionTwo = 0
    setRoots([])
    // to solve for X: x = -b + or - Math.sqrt(b^2 - 4ac + 4ay) all divided by 2a
    if ( functionOption === '1') {
      solutionOne = ((valueY - valueB) / valueA )
      setRoots( [ solutionOne ] )
    } else if ( functionOption === '2' ){
      solutionOne = Math.sqrt((valueY - valueB) / valueA)
      solutionTwo = - Math.sqrt( ( valueY - valueB) / valueA )
      setRoots([solutionOne, solutionTwo])
      setShowing(false)
      
    }
    else if ( functionOption === '3'){
    solutionOne = -(valueB) + Math.sqrt( (valueB**2) - (4 * valueA * valueC) + ( 4 * valueA * valueY ) ) / ( 2*valueA)
    solutionTwo = -(valueB) - Math.sqrt( (valueB**2) - (4 * valueA * valueC) + ( 4 * valueA * valueY ) ) / ( 2*valueA)
    setRoots( [solutionOne, solutionTwo] )
    setShowing(false)
    } else {
      alert("Unable to find value for X at this time, please check that all things are filled in.")
    }
   
   
  }
  

  return (
    <>
    <div>
      <img src='https://placekeanu.com/400/400' className='placeholder'></img>
      
    </div>
    {/* May change select feature to: https://codepen.io/celine-andre/pen/JjxVbaO */}
      <select onChange={(e)=>{ 
        if(e.target.value === '0'){
          setDefaulto(false), setC(false), setFunctionOption('0')
        }
        else if( e.target.value === '1' ||  e.target.value === '2'){
          setDefaulto(true), setC(false), setFunctionOption(e.target.value)
        }
        else if(e.target.value === '3'){
            setC(true), setDefaulto(true), setFunctionOption('3');
        }
        }}>
        <option value={'0'}> Please select one of the following funcitons</option>
        <option value={'1'}> y = Ax + B</option>
        <option value={'2'}> y = Ax&sup2; + B </option>
        <option value={'3'}> y = Ax&sup2; + Bx + C</option>
      </select>
      <div>
      {defaulto ? (
      <div>
        <p>
          Please give A a value: <input 
          placeholder='Default = 1' 
          type='number' 
          onChange={(e)=>{setValueA(e.target.value)}}
          />
        </p>
        
        <p>
          Please give B a value: <input 
          placeholder='Default = 0' type='number'
          onChange={(e)=>{setValueB(Number(e.target.value))}}
          />
          
        </p>
        { C ? (
          <p>Please give C a value: 
            <input 
            placeholder='Default = 0' 
            type='number'
            onChange={(e)=>{setValueC(Number(e.target.value))}}
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
      </div>
        { isChecked ? (
        <p> testing </p>
       ) : (
        <p> Testing 2 </p>
       )}
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
            <button onClick={findY}>Find Y</button>
          
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
          <button onClick={findX}>Find X</button>
          { showing ? (
            <p>X = {roots[0]}</p>
          ) : (
            <p>X = {roots[0]}, {roots[1]}</p>
          )}
          
        </div>
      
      
    </>
  );
}


export default HomePage;
