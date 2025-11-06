import  { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import  {validateEmail , validatePassword } from '../../utils/util'
import { useUser } from '../../api_context/UserContext'

function Registration() 
{
  const navigate = useNavigate();

  const { 
    registration , 
    error 
  } = useUser();
    

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => 
  {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    const mail = validateEmail(user.email)
    const pass = validatePassword(user.password)
    
    if( mail  )
    {
      newErrors.email = mail
    }

    if( pass )
    {
      newErrors.password = pass
    } 

    // console.log(newErrors);

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => 
    {
        e.preventDefault();

        if (validate()) 
        {
          const response = await registration(user);

          console.log(response);
          // console.log(error);

          if( response)
          {
            toast.success("Registration successful!")
            setUser({ email: "", password: "" });
            navigate('/')
            return
          }
          else
          {
            toast.error("Registration failed!")
          }
          
        }
        else
        {
          toast.error("Registration failed!")
        }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-50 p-4">
      <div className="w-full max-w-md h-[70vh] bg-white shadow-2xl rounded-2xl p-8 mt-5">

        <h2 className="text-3xl font-bold text-center text-green-600 mb-6 mt-5">
          Create Account 🚶
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
            className="w-full py-2.5 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-gray-600 text-sm mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    // </div>
  );
}

export default Registration;