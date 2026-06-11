import Button from "@mui/material/Button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function SideBar() {

  const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const logout = () => {
      localStorage.removeItem("token");
      authContext?.setUserData(null);
      navigate("/auth");
  };
  return (
    <>
      <Button variant="contained" size="large" onClick={logout}>logout</Button>
    </>
  )
}
