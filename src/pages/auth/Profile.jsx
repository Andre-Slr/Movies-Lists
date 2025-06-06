import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useUserContext } from "../../contexts/UserContext";

function Profile() {
    const { user, logoutUser, loading, error } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }
    , [user, navigate]);

  return (
    <div>
      <h1>Profile</h1>
      <p>This is the profile page.</p>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}

export default Profile;