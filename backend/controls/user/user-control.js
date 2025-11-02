const User = require('../../model/user_model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => 
{
    try 
    {
        const { email, password } = req.body;
        
        if (!email || !password) 
        {
            return res.status(400).json({ message: 'Email and password are required.',ok:false  });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) 
        {
            return res.status(409).json({ message: 'User already exists.',ok:false });
        }
        
        const hashedPassword = await bcrypt.hash( password, saltRounds );

        const newUser = new User({email,password: hashedPassword});
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email }, 
            JWT_SECRET,
            { expiresIn: '1h' });

        return res.status(201).json(
            { 
                ok:true,
                message: 'User registered successfully.', 
                token:token,
                data:newUser.email
            });

    } 
    catch (error) 
    {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error.',ok:false });
    }
}

const getuserByEmail = async (req, res) => 
{

    try 
    {
        const { email } = req.body;

        if (!email) 
        {
            return res.status(400).json({ message: 'Email is required.',ok:false  });
        }

        const user = await User.findOne({ email });

        if (!user) 
        {
            return res.status(404).json({ message: 'User not found.',ok:false  });
        }

        return res.status(200).json({ data: user,ok:true });
    } 
    catch (error) 
    {
        return res.status(500).json({ message: 'Internal server error.',ok:false  });
    }

}

const getusers = async (req, res) => 
{
    try 
    {
        const user = await User.findOne({ });

        return res.status(200).json({ data: user,ok:true });
    } 
    catch (error) 
    {
        return res.status(500).json({ message: 'Internal server error.',ok:false  });
    }
}


const login = async (req, res) =>
{
    try 
    {
        const { email, password } = req.body;

        if (!email || !password) 
        {
            return res.status(400).json({ message: 'Email and password are required.',ok:false  });
        }

        const user = await User.findOne({ email });

        if (!user) 
        {
            return res.status(409).json({ message: 'User does not exists.',ok:false });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
        {
            return res.status(401).json({ ok: false, message: 'Invalid  password.' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );


        return res.status(200).json(
            { 
                ok:true,
                message: 'User loged in successfully.', 
                token:token,
                data:user.email
            });


    } 
    catch (error) 
    {
        return res.status(500).json({ ok: false, message: 'Internal server error.' });
    }
}


module.exports = 
{
    register,
    getuserByEmail,
    getusers,
    login
}