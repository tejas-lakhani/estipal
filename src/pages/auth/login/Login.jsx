import React from "react";
import { useForm, Controller } from "react-hook-form";
import bgImage from "../../../assets/images/img-bg-login.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Login handler
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PUBLIC_BASE_URL}/login`,
        data
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        localStorage.setItem("authToken", response?.data?.payload?.token);
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-form-wrapper">
        <div className="login-form">
          <div className="logo text-center">
            <img
              src="https://www.estipal.com/assets/dist/images/img-logo-login.svg"
              alt="logo"
              className="mx-auto"
            />
          </div>
          <div className="title text-center">Sign in Estipal</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username is required",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="username"
                    className="form-control"
                    placeholder="Enter your username"
                  />
                )}
              />
              {errors?.username && (
                <p className="text-red-500 text-sm">
                  {errors?.username?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                )}
              />
              {errors?.password && (
                <p className="text-red-500 text-sm">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            <div>
              <a href="/" className="text-[#039be5]">
                Forgot password?
              </a>
            </div>
            <div className="w-100-p" style={{ marginTop: "15px" }}>
              <button
                type="submit"
                className="btn bg-[#3c8dbc] w-full"
                style={{ borderRadius: "20px" }}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <footer>© 2024 Estipal - All right reserved</footer>
      </div>
    </div>
  );
};

export default Login;
