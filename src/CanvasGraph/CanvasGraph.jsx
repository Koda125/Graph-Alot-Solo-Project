import { useRef, useEffect, useState } from "react";

const CanvasGraph = ( props ) => {
    const ref=useRef();
    console.log("Props: ", props)

    const [ x, setX ] = useState(0)
    const [ y, setY ] = useState(0)

    function DrawGraph() {
        console.log('Render graph lines.')
        const canvas = ref.current;
        const context = canvas.getContext('2d');

        // Apply translation to center the coordinates
        context.translate(canvas.width / 2, canvas.height / 2);
        // begin to draw lines of a cartisian graph.
        context.beginPath();
        context.strokeStyle = "black"
        context.moveTo( 0, 504);
        context.lineTo(0, -504);
        context.moveTo(-504, 0);
        context.lineTo(504, 0);

        

        context.stroke();
    }

    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        DrawGraph();
        const handleMouseMove = (event) => {
          const rect = canvas.getBoundingClientRect();
          const x = (canvas.width / 2) - (event.clientX - rect.left);
          const y = (canvas.width / 2) - (event.clientY - rect.top);
          console.log(`x: ${x}, y: ${y}`);
    
          
        };
    
        canvas.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          canvas.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);
    function DrawLine(valueA, valueB, valueC) {
        console.log(valueA, valueB, valueC);
        
        const canvas = ref.current;
        const context = canvas.getContext('2d');
       
        if (props.passedItems.option === '1') {
            
            context.beginPath();
            context.strokeStyle = 'red';
            
            
            let startX = -252;
            let startY = (Number((valueA * startX) + valueB));
            console.log("Where does Y start: ", startY)
            
            
            context.moveTo(startX, startY);
            
            for (let x = -504; x <= 504; x++) {
                
                const y = Number(valueA * x + valueB);  
                context.lineTo(x, y);  
                // console.log('value of y at each iteration of x: ', y)
                // console.log("What values are we using: ", valueA, valueB, x)

                
            }
    
            
            context.stroke();
        } else {
            console.log('Oops, nothing happened... The option that was selected was: ', props.passedItems.option);
        }
    }
    
console.log('props.passedItems: ', props.passedItems)

    return (
    <>

        <canvas
        style={{ border: "5px solid blue" }}
        ref={ref}
        {...(props)}
        width={504}
        height={504}
        />
        <p><button onClick={()=>{DrawLine(props.passedItems.a, props.passedItems.b, props.passedItems.c)}}>Graph</button></p>
        
    </>
    
)}


export default CanvasGraph;