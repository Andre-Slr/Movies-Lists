import supabase from "../../services/supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, loginUser, error, loading } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
    }, [user, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(email, password);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                {error !== "Error fetching user: Auth session missing!" && <p className="error">{error}</p>}

                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => (setEmail(e.target.value))} 
                        autoComplete="email" 
                        value = {email}
                        required 
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="password" 
                        onChange={(e) => (setPassword(e.target.value))} 
                        autoComplete="current-password" 
                        value = {password}
                        required 
                    />
                </div>

                <button type="submit">Login</button>
                <button type="button" onClick={() => navigate("/register")}>Register</button>
            </form>
        </div>
    )
}

export default Login;