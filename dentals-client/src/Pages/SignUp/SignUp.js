import { GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, providerLogin, verifyEmail } =
    useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = (data) => {
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        handleEmailVerification();
        toast.success("Please verify your email address");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        console.error(error);
        setSignUpError(error.message);
      });
  };

  const handleGoogleSignUp = () => {
    setSignUpError("");
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setSignUpError(error.message);
      });
  };

  const handleEmailVerification = () => {
    verifyEmail()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const saveUser = (name, email) => {
    const user = {name, email};
    fetch("http://localhost:5000/users",{
      method : 'POST',
      headers : {
        'content-type' : 'application/json',
      },
      body : JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      navigate('/');
    })
  }

  return (
    <div className="h-[800px] shadow-2xl flex justify-center items-center">
      <div className="w-96 p-7 shadow-2xl">
        <h2 className="text-4xl mb-5 text-center font-medium">
          Sign <span className="font-bold">Up</span>{" "}
        </h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl font-medium">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input dark:text-black input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-error text-center">{errors.name?.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl font-medium">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email Address is required" })}
              className="input dark:text-black input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-error text-center">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl font-medium">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least six characters",
                },
                maxLength: {
                  value: 10,
                  message: "Password maximum ten characters",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special characters",
                },
              })}
              className="input dark:text-black input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-error text-center">
                {errors.password?.message}
              </p>
            )}
          </div>
          <input
            className="btn btn-accent w-full mt-5 text-xl font-medium"
            type="submit"
            value="Sign Up"
          />
          <div>
            {signUpError && (
              <p className="text-error text-center">Email already in used</p>
            )}
          </div>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button
          onClick={handleGoogleSignUp}
          className="btn btn-outline w-full text-xl font-medium"
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
