import {type FormEvent} from "react";
import {useNavigate} from "react-router-dom";

const MyComponent = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/");
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
