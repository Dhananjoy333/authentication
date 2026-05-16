import {type FormEvent, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const MyComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/secret', {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                navigate('/auth');
                console.log(err);
            });
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await axios.get('http://localhost:3000/api/logout',{withCredentials: true})
        if(res.data.message === "Logout successfully"){
            navigate('/');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <p>
            Welcome you gained access to this secret page
            </p>
            <form onSubmit={handleSubmit}>
                <button type='submit' className='border-3 p-2 bg-yellow-300 rounded-lg'>Log out</button>
            </form>
        </div>
    );
};

export default MyComponent;
