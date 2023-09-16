import { useNavigate } from "react-router-dom";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
