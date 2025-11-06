import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

import { validateEmail, 
  // validatePassword 
} from "../../utils/util";

import { useUser } from '../../api_context/UserContext'

function Login() 
{
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const { login,error } = useUser();
  

  const validate = ()=>
  {
    const emailError = validateEmail(user.email);
    // const passwordError = validatePassword(user.password);

    const newErrors = {};

    if (emailError) newErrors.email = emailError;
    // if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  }

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    if( validate() )
    {
      const response = await login(user);

      if( response )
      {
        toast.success("Login Successful");
        navigate("/");
        setUser({ email: "", password: "" });
        return;
      }
      else
      {
        toast.error("Invalid Credentials");
      }

    }
    else
      {
      toast.error("Invalid Credentials");
    }

    

  };

  return (
    <div className="w-full max-w-md h-[70vh] bg-white shadow-2xl rounded-2xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6 mt-5">
        Welcome Back 🙋
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* error from backend */}
        {
          error && <p className="text-red-500 text-sm mt-1">{error}</p>
        }


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </form>

      {/* Don't have account */}
      <p className="text-center text-gray-600 text-sm mt-5">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}

export default Login;