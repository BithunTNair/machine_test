import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../Plugins/toast";

const LogIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    try {
      axios({
        method: "POST",
        url: `${import.meta.env.VITE_BASE_URL}/auth/login`,
        data: data,
      })
        .then((response) => {
          console.log(response.data);
          successToast("LogIn Successful");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      errorToast("something went wrong");
    }
  };
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-semibold mb-6">
          <span className="text-black">amazon</span>
          <span className="text-orange-500">.in</span>
        </h1>

        <div className="bg-white w-96 rounded-md shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">Sign in</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-3">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-400 focus:outline-none"
                />
                <label className="text-sm font-medium">Password</label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md py-2 mt-2"
              >
                Continue
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            By continuing, you agree to Amazon’s{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Notice
            </a>
            .
          </p>

          <div className="mt-3">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              ▸ Need help?
            </a>
          </div>

          <div className="mt-5 border-t border-gray-200 pt-4">
            <p className="font-medium text-sm text-gray-700 mb-1">
              Buying for work?
            </p>
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Shop on Amazon Business
            </a>
          </div>
        </div>

        <div className="w-96 mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500">
                New to Amazon?
              </span>
            </div>
          </div>

          <button className="mt-4 w-full border border-gray-300 rounded-md py-2 font-medium text-sm bg-white hover:bg-gray-100">
            Create your Amazon account
          </button>

          <div className="mt-4 flex items-center gap-2 justify-center text-sm text-gray-600">
            <div className="flex-1 h-px bg-gray-300" />
            <span>or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <button className="mt-3 flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 w-full">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm text-gray-700">Login with Google</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default LogIn;
