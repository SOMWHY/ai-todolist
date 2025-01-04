
import { Home } from 'react-feather'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'

export default function BuyMeACoffee() {
  return (
    <div className="flex justify-center items-center p-4 w-screen h-screen">
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
  )
}

