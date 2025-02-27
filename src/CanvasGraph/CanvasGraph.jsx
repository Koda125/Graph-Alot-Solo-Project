import { useRef, useEffect, useState } from "react";
import axios from "axios";
import useStore from "../zustand/store";
import "./CanvasGraph.css"

const CanvasGraph = ( props ) => {
    const ref=useRef();
    console.log("Props: ", props)

    const user = useStore((state) => state.user);
    const [valueX, setValueX ] = useState([])
    const [valueY, setValueY ] = useState([])
    const  [newFavorite, setNewFavorite ] = useState({
        start_values_x: 0,
        start_values_y: 0,
        user_id: user.id,
        end_values_x: 0,
        end_values_y: 0

    })
    let [coordinates, setCoordinates ] = useState([{
         
    }])
    const [ slope, setSlope ] = useState()

    function DrawGraph() {
        console.log('Render graph lines.')
        const canvas = ref.current;
        const context = canvas.getContext('2d');

        // Apply translation to center the coordinates
        // context.translate(canvas.width / 2, canvas.height / 2);
        // begin to draw lines of a cartisian graph.
        context.beginPath();
        context.strokeStyle = "black"
        context.moveTo( 252, 0);
        context.lineTo(252, 504);
        context.moveTo(0, 252);
        context.lineTo(504, 252);

        
        

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
        setCoordinates([...coordinates, {
            x: x,
            y: y
        }])
        console.log("What's chilling in coordinates: ", coordinates)
        console.log("The clicked coordinates are: ", valueX, valueY);
        
      }


      //slope = (y2 - y1) / (x2 - x1)
      function DrawLine() {
        console.log('Drawing line...');
        const canvas = ref.current;
        const context = canvas.getContext('2d');
    
        const startX = coordinates[1].x;
          const startY = coordinates[1].y;
          const endX = coordinates[2].x;;
          const endY = coordinates[2].y;;
          setNewFavorite({
            start_values_x: Number(startX),
            start_values_y: Number(startY),
            user_id: user.id,
            end_values_x: Number(endX),
            end_values_y: Number(endY)
          })
          context.lineWidth = 2;
          context.beginPath();
          context.strokeStyle = 'red';
        context.moveTo(startX, startY);
          context.lineTo(endX, endY);
          
          console.log("Drawing line to: ", endX, endY);
        setSlope(-1 * ( (endY - startY) / (endX - startX)).toFixed(4))
        if (coordinates.length > 3) {
          // Draw the line between the first two points
          for( let i = 3; i < coordinates.length; i++  ){
          context.lineTo(coordinates[i].x, coordinates[i].y)
          
          
          }
          
          
        } 
        context.stroke();
      }

//Create new drawLine function to get passed data from captureMouseClick.
// Unable to make values for A > 1 B would have to be equal to (a-1)*250. Once completed, will consult and try to make this function work instead

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
        console.log('Adding to favorites 🔥', newFavorite)
        axios({
            method: 'POST',
            url: "/api/favorites/",
            data: newFavorite

        })
        .then((response) => {
            console.log("POSTing: ", newFavorite)

        }).catch((error) => {
            console.log("There was an error in your favorite POST call: ", error)
        })
    }
     function clearGraph() {
        console.log("Lets get this cleaned up")
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        DrawGraph();
        
        
    }

console.log('props.passedItems: ', props.passedItems)

    return (
    <div className="mainGraph">
        <div >
            <canvas
            
            style={{ border: "5px solid blue" } }
            ref={ref}
            {...(props)}
            width={504}
            height={504}
            onClick={(e)=>captureMouseClick(e)}
            />
        </div>
        <p className="buttonGroup">
            <button className="graphButton" onClick={()=>{DrawLine()}}>Graph</button>
            
            <button className="graphButton" onClick={()=>{addToFavorites()}}>Add to Favorites</button>
            <button className="graphButton" onClick={()=> {clearGraph()}}>Clear Graph</button>
        </p>
        <p>The slope of your First line is: {slope}</p>
        
    </div>
    
)}


export default CanvasGraph;