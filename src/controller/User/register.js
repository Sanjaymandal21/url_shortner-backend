import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt"
const registerUser = async (req, res) => {
  try {
    // destructure field
    const { name, email, password } = req.body;

    // check if fields are empty
    if(!name || !email || !password){
        return res.status(400).send(new ApiResponse(400,null,"Fields are empty"))
    }

    // 409-conflict
    const existingUser=await User.findOne(
      {email}
    )
    if(existingUser){
      return res.status(409).send(new ApiResponse(409,null,"User already exists please login"))
    }

    // hash the password
    const hashedPassword=await bcrypt.hash(password,10)

    // store in db
     const result=await User.create({
        name,
        email,
        password:hashedPassword
     })

    //  send code 201
     res.status(201).send(new ApiResponse(201,result,"User created successfully"))


  } catch (error) {
    console.log(error);
    res.status(500).res.send(new ApiResponse(500, error, "failed to register"));
  }
};
export default registerUser;
