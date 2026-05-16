import {Routes, Route} from "react-router-dom";
import {HomePage} from "../Pages/HomePage";
import AuthPage from "../Pages/AuthPage";
import SecretPage from "../Pages/SecretPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/secret" element={<SecretPage/>}/>
        </Routes>
    );
};

export default AppRoutes;