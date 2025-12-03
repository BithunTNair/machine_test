import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../Plugins/toast";

const SignUp = () => {
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
        url: `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        data: data,
      })
        .then((response) => {
          console.log(response.data);
          successToast("User Registered Successfully");

          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      errorToast("Something Went Wrong");
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
          <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

          <div className="flex flex-col space-y-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-sm font-medium">Your name</label>
                <input
                  {...register("fullName", { required: true })}
                  name="fullName"
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Your Email</label>
                <input
                  {...register("email", { required: true })}
                  name="email"
                  type="email"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  {...register("password", { required: true })}
                  name="password"
                  type="password"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-md py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
                aria-label="Create account"
              >
                Create
              </button>
            </form>
          </div>

          <div className="mt-5 text-sm">
            <p className="text-gray-600">
              Buying for work?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Create a free business account
              </a>
            </p>
          </div>

          <div className="mt-5 text-sm text-gray-700">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Sign in
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            By creating an account or logging in, you agree to Amazon’s{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Notice
            </a>
            .
          </p>
        </div>

        <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span>or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button className="mt-3 flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700">Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
