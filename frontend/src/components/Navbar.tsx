import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row items-center space-x-5'>
                <img 
                    src='../icon.svg' 
                    alt='icon' 
                />
                <p className='text-xl font-semibold'>DashBoard</p>
            </div>
            <Link to={'/sign-out'} className='underline text-blue-700 hover:text-blue-500'>Sign Out</Link>
        </div>
    )
}

export default Navbar