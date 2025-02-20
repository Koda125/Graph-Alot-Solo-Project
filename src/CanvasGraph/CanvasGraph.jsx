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
        context.moveTo( 0, 252);
        context.lineTo(0, -252);
        context.moveTo(-252, 0);
        context.lineTo(252, 0);
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
    
          // Optional: Draw a small circle at the mouse position
          
          context.beginPath();
          context.arc(x, y, 5, 10, 2 * Math.PI);
          context.fillStyle = 'red';
          context.fill();
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

        DrawGraph();
        
        if (props.passedItems.option === '1') {
            
            context.beginPath();
            context.strokeStyle = 'red';
            
            
            // let startX = 504;
            // let startY = ( canvas.height / 2 ) - ((valueA * startX) + valueB);
            
            
            // context.moveTo(startX, startY);
            
            for (let i = -252; i <= 252; i++) {
                
                const y = ((valueA * i) + valueB);  
                console.log("What values are being used?", valueA, valueB )

                //Translate the y-coordinate to the new center of the canvas:
                const translatedY = ( canvas.height / 2 ) - y;
                console.log('What is the value for translatedY: ', translatedY, "When i= ", i)

                if( i === -252){
                    //When i is equal to the lower bound of the for loop:
                context.moveTo(i, y);  
                } else {
                    //When i is anything buy the lower bound.
                    context.lineTo(i, y)
                }
                //Draw the line:
                context.stroke();
            }
    
            
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