import { jsPDF } from "jspdf";

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
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}/;
    
  return pattern.test(url);
};


export const handleDownloadDocument = (content, filename) => {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4"
  });

  const margin = 40;
  const lineSpacing = 18;
  const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);

  // Split text into lines automatically
  const textLines = doc.splitTextToSize(content, maxWidth);

  let y = margin;

  textLines.forEach((line, index) => {
    // If reaching bottom of page -> add new page
    if (y > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }

    doc.text(line, margin, y);
    y += lineSpacing;
  });

  doc.save(filename + ".pdf");
};