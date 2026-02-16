'use client'
import { useState } from "react"
export default function State(){
    const [count, setCount] = useState("")
    function clickFunc(){
        setCount(count + " Nextjs 16");
    }
    return(
        <>
            <button className="bg-red-400" onClick={clickFunc}>Hello from Nextjs{count} </button>    
        </>
    )
}   