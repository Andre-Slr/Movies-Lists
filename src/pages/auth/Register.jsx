import supabase from "../../services/supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const { user, registerUser, error, loading } = useUserContext();

    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
    }, [user, navigate]);

    const handleRegister = (e) => {
        e.preventDefault();
        registerUser(username, email, password, confirmPassword, name, lastName);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                {error !== "Error fetching user: Auth session missing!" && <p className="error">{error}</p>}
                
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => (setEmail(e.target.value))} 
                        autoComplete="email" 
                        value={email}
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
                        value={password}
                        required 
                    />
                </div>

                <div>
                    <label>Confirm password</label>
                    <input 
                        type="password" 
                        placeholder="confirm password" 
                        onChange={(e) => (setConfirmPassword(e.target.value))} 
                        autoComplete="current-password" 
                        value={confirmPassword}
                        required 
                    />
                </div>

                <div>
                    <label>Username</label>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        onChange={(e) => (setUsername(e.target.value))} 
                        value={username}
                    />
                </div>

                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        onChange={(e) => (setName(e.target.value))} 
                        value={name}
                    />
                </div>

                <div>
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        onChange={(e) => (setLastName(e.target.value))} 
                        value={lastName}
                    />  
                </div>

                <button type="submit">Register</button>
                <button type="button" onClick={() => navigate("/login")}>Login</button>
            </form>
        </div>
    )
}

export default Register;