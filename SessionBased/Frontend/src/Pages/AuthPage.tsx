/* eslint-disable react-hooks/immutability */
import {useRive, useStateMachineInput} from "@rive-app/react-canvas";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AuthPage = () => {

    const machineName = "State Machine 1";
    const {rive, RiveComponent} = useRive({
        src: "/login-character.riv",
        stateMachines: machineName,
        autoplay: true,
    });

    useStateMachineInput(rive, machineName, "Speaking", false);
    const onTyping = useStateMachineInput(rive, machineName, "Check");
    const follow = useStateMachineInput(rive, machineName, "Look");
    const passwordInput = useStateMachineInput(rive, machineName, "hands_up");
    const success = useStateMachineInput(rive, machineName, "success");

    const [signUp, setSignUp] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [login, setLogin] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate();

    const handleSubmit = async (e, mode: string) => {
        e.preventDefault();
        if (mode === "signUp") {
            try {
                const res = await axios.post(
                    'http://localhost:3000/api/signUp',
                    signUp
                );
                alert(res.data.message);

            } catch (e) {
                console.log(e.response.data.message);
            }
        } else {
            try {
                const res = await axios.post(
                    'http://localhost:3000/api/login',
                    login,
                    {withCredentials: true},
                );
                alert(res.data.message);
                navigate("/secret");
            } catch (e) {
                if (
                    e.response.status === 401 ||
                    e.response.status === 404
                ) {
                    alert(e.response.data.message);
                } else {
                    console.log(e);
                }
            }
        }
    }
    return (
        <div className="w-full h-svh flex flex-col justify-center items-center">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
                <source src="/bg-video.mp4" type="video/mp4"/>
            </video>
            <div className="w-55 2xl:w-88 h-55 2xl:h-88">
                <RiveComponent/>
            </div>
            <div
                className='w-87.5 2xl:w-140 h-110 2xl:h-150 flex flex-col items-center justify-center bg-[url("/bg.jpg")] bg-cover bg-center overflow-hidden relative rounded-lg'>
                <input type="checkbox" id="check" className="hidden peer"/>
                {/*Register/Signup Section*/}
                <div className="w-full h-full">
                    <form
                        onSubmit={(e) => handleSubmit(e, 'signUp')}
                        className="flex flex-col gap-5 2xl:gap-10 py-8 2xl:py-14 justify-center items-center"
                    >
                        <label htmlFor="check" className="text-2xl text-white font-bold">
                            Sign Up
                        </label>
                        <input
                            onFocus={() => (onTyping.value = true)}
                            onBlur={() => (onTyping.value = false)}
                            onChange={(e) => {
                                // animation logic
                                follow.value = e.target.value.length * 2;
                                // state update logic
                                setSignUp((prev) => ({
                                    ...prev,
                                    username: e.target.value,
                                }));
                            }}
                            value={signUp.username}
                            type="text"
                            placeholder="Username"
                            className="bg-gray-200 p-3 rounded-lg w-[80%]"
                        />
                        <input
                            onFocus={() => (onTyping.value = true)}
                            onBlur={() => (onTyping.value = false)}
                            onChange={(e) => {
                                // animation logic
                                follow.value = e.target.value.length * 2;
                                // state update logic
                                setSignUp((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }));
                            }}
                            value={signUp.email}
                            type="email"
                            placeholder="Email"
                            className="bg-gray-200 p-3 rounded-lg w-[80%]"
                        />
                        <input
                            onFocus={() => (passwordInput.value = true)}
                            onBlur={() => (passwordInput.value = false)}
                            onChange={(e) => {
                                setSignUp((prev) => ({...prev, password: e.target.value}))
                            }}
                            type="password"
                            placeholder="password"
                            className="bg-gray-200 p-3 rounded-lg w-[80%]"
                        />
                        <button
                            type='submit'
                            onClick={() => success?.fire()}
                            className="py-3 bg-[#4C1D95] text-xl font-bold text-white w-[60%] rounded-lg"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

                {/*Login Section*/}
                <div
                    className="absolute w-full h-full bg-white translate-y-90 2xl:translate-y-130 rounded-t-[100px_20px] peer-checked:translate-y-20 2xl:peer-checked:translate-y-30 transition-all duration-500">
                    <form
                        onSubmit={(e) => handleSubmit(e, 'login')}
                        className="flex flex-col gap-5 py-8 justify-center items-center"
                    >
                        <label
                            htmlFor="check"
                            className="text-2xl text-orange-500 font-bold hover:cursor-pointer"
                        >
                            Login
                        </label>
                        <input
                            onFocus={() => (onTyping.value = true)}
                            onBlur={() => (onTyping.value = false)}
                            onChange={(e) => {
                                // animation logic
                                follow.value = e.target.value.length * 2;
                                // state update logic
                                setLogin((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }));
                            }}
                            value={login.email}
                            type="email"
                            placeholder="Email"
                            className="bg-gray-200 p-3 rounded-lg w-[80%]"
                        />
                        <input
                            onFocus={() => (passwordInput.value = true)}
                            onBlur={() => (passwordInput.value = false)}
                            onChange={(e) => {
                                setLogin((prev) => ({...prev, password: e.target.value}))
                            }}
                            value={login.password}
                            type="password"
                            placeholder="password"
                            className="bg-gray-200 p-3 rounded-lg w-[80%]"
                        />
                        <button className="py-3 bg-amber-400 text-xl font-bold text-white w-[60%] rounded-lg">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
