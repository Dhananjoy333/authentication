import {Link} from 'react-router-dom'

export const HomePage = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            Homepage
            <button className='border-2 p-2 rounded-md bg-yellow-300'>
                <Link to="/auth">Login</Link>
            </button>
        </div>
    )
}
