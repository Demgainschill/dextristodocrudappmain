import Link from "next/link";
import Search from "./search";

export default function Navbar(){
    return (
        <div className="text-center bg-green-300 h-20 flex items-center justify-center gap-20">
            
        <Link href="/">Home</Link>
        <Search/>
        <Link href="/posts">Posts</Link>   
        <Link href="/help">Help</Link>
        </div>
    )
}