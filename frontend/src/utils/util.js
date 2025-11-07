export const validateEmail = (email) => 
{
    
     if (!email) 
    {
      return "Email is required";
    } 
    else if (!/\S+@\S+\.\S+/.test(email)) 
    {
      return "Enter a valid email address";
    }
    return null;
}

export const validatePassword = (password) => 
{
    if (!password) {
      return "Password is required";
    }

  // Check length
   if (password.length < 8) {
     return "Password must be at least 8 characters long";
   }

  // Regex for lowercase, uppercase, number, and special character
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

    if (!regex.test(password)) 
    {
        return "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }

  return null;
};

export const isValidYouTubeUrl = (url) => {
  if (!url || typeof url !== "string") return false;

  const pattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)[a-zA-Z0-9_-]{11}/;

  return pattern.test(url);
};
