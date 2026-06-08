import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const logout = () => {
      localStorage.removeItem("token");
      authContext?.setUserData(null);
      navigate("/auth");
  };
  return (
    <div>
      <Button variant="contained" size="large" onClick={logout}>logout</Button>
    </div>
  )
}
