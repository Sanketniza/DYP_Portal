// Find the logout handler function in your code and update it with this pattern:
const logoutHandler = async () => {
  try {
    // Your axios logout call
    const response = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
    
    // Handle successful logout
    if (response.data.success) {
      // Your success logic
    }
  } catch (error) {
    console.error("Logout error:", error);
    
    // Better error handling to prevent "undefined" errors
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Logout failed");
    } else {
      toast.error("Network error. Please check your connection.");
    }
    
    // If this is a development environment, you might want to proceed with logout anyway
    // to prevent users from getting stuck
    dispatch(removeUser());
    navigate("/login");
  }
};
  }
};
