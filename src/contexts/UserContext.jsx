import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                setError("Error fetching user: " + error.message);
            } else {
                setUser(user);
                setError(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    /** Logs in a user with username and password
     * 
     * @param {string} userEmail 
     * @param {string} userPassword 
     * @returns
     * @throws {Error} If login fails
     */
    const loginUser = async (userEmail, userPassword) => {
        setLoading(true);
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: userPassword,
        });
        if (error) {
            setError(error.message);
        } else {
            setUser(user);
            setError(null);
        }
        setLoading(false);
    };

    /** 
     * Registers a new user with email and password.
     * It also takes optional parameters for username, name and last name.
     * Favorites are initialized as an empty jsonb.
     * 
     * @param {string} [username]
     * @param {string} userEmail 
     * @param {string} userPassword 
     * @param {string} userConfirmPassword 
     * @param {string} [name] 
     * @param {string} [last_name] 
     * @returns 
     * @throws {Error} If registration fails
     * @throws {Error} If passwords do not match
     */
    const registerUser = async (username=null, userEmail, userPassword, userConfirmPassword, name=null, last_name=null) => {
        setLoading(true);
        if (userPassword !== userConfirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }
        const { data: { user }, error } = await supabase.auth.signUp({
            email: userEmail,
            password: userPassword,
            options: {
                data: {
                    display_name: username,
                    name: name,
                    last_name: last_name,
                    photo_url: null,
                },
            },
        });
        if (error) {
            console.log("Registration error:", error.message);
            setError(error.message);
        } else {
            setUser(user);
            setError(null);
        }
        setLoading(false);
    };

    /**
     * Logs out the current user.
     * @returns {Promise<void>} A promise that resolves when the user is logged out.
     * @throws {Error} If logout fails
     * @throws {Error} If user is not logged in
     */
    const logoutUser = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error:", error.message);
            setError(error.message);
        } else {
            setUser(null);
            setError(null);
        }
        setLoading(false);
    };

    /**
     * Updates the user data in Supabase.
     * 
     * @param {object} userData 
     */
    const editUser = async (userData) => {
        setLoading(true);

        if (!user || !user.id) {
            console.error("User or user ID is not defined.");
            setError("User is not authenticated or invalid.");
            setLoading(false);
            return;
        }

        const filteredUserData = {
            username: userData.username,
            name: userData.name,
            last_name: userData.last_name,
        };

        const { data, error } = await supabase.auth.updateUser({
            data: filteredUserData,
        });

        if (error) {
            console.error("Error updating user:", error.message);
            setError("Failed to update user. Please try again.");
        } else {
            setUser({ ...user, ...filteredUserData }); // Actualiza el estado global del usuario
            setError(null);
        }

        setLoading(false);
    };

    const value = {
        user,
        loginUser,
        registerUser,
        logoutUser,
        editUser,
        loading,
        error,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};