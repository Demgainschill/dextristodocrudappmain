import Link from "next/link";

export default function Navbar(){
    return (
        <div className="text-center bg-green-300 h-20 flex items-center justify-center gap-20">
            
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>    
        </div>
    )
}