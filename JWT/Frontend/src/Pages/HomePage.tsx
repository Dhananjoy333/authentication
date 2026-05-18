import {Link} from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import axios from 'axios';

export const HomePage = () => {

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const res = await axios.get(
                'http://localhost:3000/api/secret',
                {withCredentials: true}
            );

            if (res.data.message === "authorized") {
                navigate('/secret');
            }

        } catch (err) {
            console.log(err);
            navigate('/auth');
        }
    }

    return (
        <div className='flex flex-col items-center justify-center gap-5'>
            Homepage
            <button className='border-2 p-2 rounded-md bg-yellow-300'>
                <Link to="/auth">Login</Link>
            </button>
            <button onClick={handleClick} className='border-2 p-2 rounded-md bg-yellow-300'>
                See Secrets
            </button>

        </div>
    )
}
