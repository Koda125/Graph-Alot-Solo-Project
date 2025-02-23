import { useEffect, useRef } from "react";

const FavoriteCanvas = ( props ) => {
    const ref=useRef();
    console.log("Passed Props: ", props)

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
        context.beginPath();
        context.moveTo(252, 252);
        context.lineTo(props.item.X, props.item.y)
        context.stroke()

    }

    return (
        <>
        <h2>Person's favorite graphs will go here</h2>
        <canvas
        style={{ border: "5px solid blue" } }
        ref={ref}
        {...(props)}
        width={504}
        height={504}
        onClick={(e)=>captureMouseClick(e)}
        />
        </>
    )
}

export default FavoriteCanvas;