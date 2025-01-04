import { Home } from 'react-feather'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'


export default function BuyMeACoffee() {
  return (
    <div 
    style={{ 
      background:"url(`/assets/coffee-bg.jpg`)",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",}}
    
     className="lazy-background relative flex justify-center items-center p-4 w-screen h-screen "  >
     <div className="absolute inset-0 dark:bg-malibu-950/60 bg-malibu-800/60"></div>
     <div className=' z-50'>

        <Button className="rounded-lg absolute left-3 top-14 text-malibu-950 dark:text-malibu-200 dark:bg-malibu-900/80 bg-malibu-500 ">
            <Link to="/" className='flex gap-1'>
            <Home/> <span>
              
              Home
              </span>
              
            </Link>
        </Button>
      <a
        href="https://afdian.com/a/som5why"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#24292e] hover:bg-[#2f363d] hover:scale-105 text-malibu-200 font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
      >

        <span>在爱发电上赞助我</span>
      </a>
     </div>
    </div>
  )
}

