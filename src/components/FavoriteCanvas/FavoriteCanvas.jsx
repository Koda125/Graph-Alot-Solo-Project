import { useEffect, useRef } from "react";
import axios from "axios";
import useStore from "../../zustand/store";
import "./FavoriteCanvas.css"

const FavoriteCanvas = ( props ) => {
    const ref=useRef();
    console.log("Passed Props: ", props)
    const user = useStore((state) => state.user);

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
        
        DrawGraph();
        drawLine()
    }, []);

    function drawLine( ) {
        console.log("Lets draw a line!")
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = "purple"
        context.lineWidth = 2
        context.beginPath();
        context.moveTo(props.item.start_x, props.item.start_y);
        context.lineTo(props.item.end_x, props.item.end_y)
        context.stroke()

    }

    
        
    

    return (
        <>
        
        <canvas
        className="favorite-graph"
        style={{ border: "5px solid blue" } }
        
        ref={ref}
        {...(props)}
        width={504}
        height={504}
        onClick={(e)=>captureMouseClick(e)}
        />
        <p>
        
        </p>
        </>
    )
}

export default FavoriteCanvas;