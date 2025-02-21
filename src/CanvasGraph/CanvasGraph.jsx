import { useRef, useEffect, useState } from "react";

const CanvasGraph = ( props ) => {
    const ref=useRef();
    console.log("Props: ", props)

    const [valueX, setValueX ] = useState([])
    const [valueY, setValueY ] = useState([])

    function DrawGraph() {
        console.log('Render graph lines.')
        const canvas = ref.current;
        const context = canvas.getContext('2d');

        // Apply translation to center the coordinates
        // context.translate(canvas.width / 2, canvas.height / 2);
        // begin to draw lines of a cartisian graph.
        // context.beginPath();
        // context.strokeStyle = "black"
        // context.moveTo( 0, 504);
        // context.lineTo(0, -504);
        // context.moveTo(-504, 0);
        // context.lineTo(504, 0);

        
        

        context.stroke();
    }
    

    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        DrawGraph();
        const handleMouseMove = (event) => {
          const rect = canvas.getBoundingClientRect();
          const x = (event.clientX - rect.left);
          const y = (event.clientY - rect.top);
          
          console.log(`x: ${x}, y: ${y}`);
    
          
        };
    
        canvas.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          canvas.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);

      function captureMouseClick( e ) {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        context.strokeStyle = 'red';
        const x = (e.clientX - canvas.getBoundingClientRect().left);
        const y =  (e.clientY - canvas.getBoundingClientRect().top);
        console.log('The clicked coordinates are: ', x, y)
        setValueX([...valueX, x])
        setValueY([...valueY, y])
        console.log('The array length is of valueX is: ', valueX.length)
        console.log("The clicked coordinates are: ", valueX, valueY);
        
      }


      //slope = (y2 - y1) / (x2 - x1)
      function DrawLine() {
        console.log('Drawing line...');
        const canvas = ref.current;
        const context = canvas.getContext('2d');
    
        if (valueX.length > 1) {
          // Draw the line between the first two points
          const startX = valueX[0];
          const startY = valueY[0];
          const endX = valueX[1];
          const endY = valueY[1];
          
          context.beginPath();
          context.strokeStyle = 'red';
          context.moveTo(startX, startY);
          context.lineTo(endX, endY);
          context.stroke();
          console.log("Drawing line to: ", endX, endY);
        } else {
          alert("Please click two spots on the graph.");
        }
      }

//Create new drawLine function to get passed data from captureMouseClick.

    // function DrawLine(valueA, valueB, valueC) {
    //     console.log(valueA, valueB, valueC);
        
    //     const canvas = ref.current;
    //     const context = canvas.getContext('2d');
       
    //     if (props.passedItems.option === '1') {
            
    //         context.beginPath();
    //         context.strokeStyle = 'red';
            
            
    //         let startX = -252;
    //         let startY = (Number((valueA * startX) + valueB));
    //         console.log("Where does Y start: ", startY, "Where does X start: ", startX)
            
            
    //         context.moveTo(startX, startY);
            
    //         for (let x = -504; x <= 504; x++) {
                
    //             const y = (valueA * x + valueB);  
    //             context.lineTo(x, y);  
    //             // console.log('value of y at each iteration of x: ', y)
    //             console.log("What values are we using: ", valueA, valueB, x, y)

                
    //         }
    
            
    //         context.stroke();
    //     } else {
    //         console.log('Oops, nothing happened... The option that was selected was: ', props.passedItems.option);
    //     }
    // }
    function addToFavorites( ){
        console.log('Adding to favorites 🔥')
    }


console.log('props.passedItems: ', props.passedItems)

    return (
    <>

        <canvas
        style={{ border: "5px solid blue" } }
        ref={ref}
        {...(props)}
        width={504}
        height={504}
        onClick={(e)=>captureMouseClick(e)}
        />
        <p>
            <button onClick={()=>{DrawLine()}}>Graph</button>
            
            <button onClick={()=>{addToFavorites()}}>Add to Favorites</button>
            </p>
        
    </>
    
)}


export default CanvasGraph;