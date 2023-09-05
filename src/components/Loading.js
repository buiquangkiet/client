import React from 'react'
// width: 48px;
// height: 48px;
// border: 5px solid #FFF;
// border-bottom-color: transparent;
// border-radius: 50%;
// display: inline-block;
// box-sizing: border-box;
// animation: rotation 1s linear infinite;
const Loading = () => {
    return (
        <div className="w-screen h-screen fixed z-40">
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] z-40"></div>
            <span className="absolute top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[48px] h-[48px] border-[5px] border-[#fff] border-b-transparent rounded-[50%] inline-block animate-rotation"></span>
        </div>
    )
}

export default Loading
