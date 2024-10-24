import httpStatus from "http-status";
import { User } from "../model/users/users.js";
import { Admin } from "../model/users/admin.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const adminReg = async (req, res) => {
  const { username, email, gender, password } = req.body;
  if (!password) {  
    return res.status(httpStatus.CONFLICT).json({  
      status: "error",  
      message: "Password is required",  
    });  
  }  

  try {
    let admin = await Admin.findOne({ email: email });
    if (admin) {
      return res.status(httpStatus.CONFLICT).json({
        status: httpStatus.CONFLICT,
        message: "admin with email already exixts",
      });
    }

    admin = await Admin.findOne({ username: username });
    if (admin) {
      return res.status(httpstatus.CONFLICT).json({
        status: httpStatus.CONFLICT,
        message: "admin with username already exixts",
      });
    }

     // Hash the password  
     const salt = await bcrypt.genSalt(10);  
     const hashedPassword = await bcrypt.hash(password, salt);  

    admin = new Admin({ username, email, gender, password: hashedPassword });
    await admin.save();

    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Admin registered successfully",
      data: admin,
    });
  } catch (error) {
    Console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Registeration unsuccessful",
    });
  }
};

export { adminReg };

const getAdmin = async (req, res) => {
  try {
    let admin = await Admin.find({});
    if (admin.length === 0 || !admin) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "Admin not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Admin retrieved successfully",
      data: admin,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "not found",
    });
  }
};

export { getAdmin };

// get users

const getUsers = async (req, res) => {
  try {
    let user = await User.find({});
    if (user.length === 0 || !user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "User not found",
      });
    }
    res.status(httpStatus.OK).json({
      status: "success",
      message: "registered users retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "not found",
    });
  }
};

// get one user

const getUser = async (req, res) => {
  const { type, id, email, username } = req.query;
  let user;
  try {
    switch (type) {
      case "id":
        if (!id) {
          return res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: "id parameter is required",
          });
        }
         user = await User.findById(id);
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: httpStatus.NOT_FOUND,
            message: "User not found",
          });
        }

        return res.status(httpStatus.FOUND).json({
          status: "success",
          message: "User retrieved successfully",
          data: user,
        });

      case "email":
        if (!email) {
          return res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: "email parameter is required",
          });
        }

        user = await User.findOne({email});
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: httpStatus.NOT_FOUND,
            message: "User with email not found",
          });
        }

        return res.status(httpStatus.FOUND).json({
          status: "success",
          message: "User retrieved successfully",
          data: user,
        });

      case "username":
        if (!username) {
          return res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: "User with username does not exist",
          });
        }

        user = await User.findOne({ username });
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: httpStatus.NOT_FOUND,
            message: "User with username not found",
          });
        }

        return res.status(httpStatus.FOUND).json({
          status: "success",
          message: "User retrieved successfully",
          data: user,
        });

      default:
        return res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "Invalid type",
        });
    }
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Invalid",
    });
  }
};

// get one admin
const getOneAdmin = async (req,res) => {
  const {id, username, email} = req.query;
  try {
    let admin;
    if (id) {  
      admin = await Admin.findById(id);  
      if (!admin) {  
          return res.status(httpStatus.NOT_FOUND).json({  
              status: "error",  
              message: "admin with the given id does not exist"  
          });  
      } else {  
          return res.status(httpStatus.OK).json({  
              status: "success",  
              message: "Admin retrieved successfully",  
              data: admin  
          });  
      }  
  } else if (username) {  
      admin = await Admin.findOne({ username });  
      if (!admin) {  
          return res.status(httpStatus.NOT_FOUND).json({  
              status: "error",  
              message: "admin with the given username does not exist"  
          });  
      } else {  
          return res.status(httpStatus.OK).json({  
              status: "success",  
              message: "Admin retrieved successfully",  
              data: admin  
          });  
      }  
  } else if (email) {
    admin = await Admin.findOne({ email});
    if(!admin){
      return res.status(httpStatus.NOT_FOUND).json({
         status: "error",
         message: "admin with email already exists"
      })
    }else{
      return res.status(httpStatus.OK).json({
        status: "success",
        message: "Admin retrieved successfully",
        data: admin
      })
    }
  } else {  
      return res.status(httpStatus.BAD_REQUEST).json({  
          status: "error",  
          message: "Either id or username parameter is required"  
      });  
  }
    
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
    
  }
  
}

// delete a user
const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
  };
  return res.status(httpStatus.NO_CONTENT).json({
    status: "success",
    message: "User deleted successfully",
    data: user
  });
    
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Invalid",
    });
  }
  
};

// update admin
 const updateAdmin = async (req,res) => {
  const {username,email,gender,password} = req.body;
  const {id} = req.params;
  try {
    const adminExists = await Admin.findById(id);
    if(!adminExists) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Admin not found",
      });
    }
    const emailExists = await Admin.findOne({ email})
    if(emailExists && emailExists._id.toString()!== id) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "Admin with this email already exists",
      });
    }

    const usernameExists = await Admin.findOne({username});
    if(usernameExists && usernameExists._id.toString()!== id){
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "Admin with this username already exists",
      })
    }

    const updateData = {};
    if(username) updateData.username = username;
    if(email) updateData.email = email;
    if(gender) updateData.gender = gender;
    if(password) updateData.password = password;

    const updatedUser = await Admin.findByIdAndUpdate(
      id,
      {$set : updateData},
      {new:true}
    )

    return res.status(httpStatus.OK).json({
      status: "success",
      message: "Admin updated successfully",
      data: updatedUser,
    })
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status:"error",
      message: "Invalid",
    });
    
  }
 }

//  delete admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Admin not found",
      });
    }
    return res.status(httpStatus.NO_CONTENT).json({
      status: "success",
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
  }
 };

 

// Login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminExists = await Admin.findOne({ email: email });

    if (!adminExists) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "Not Found",
        message: "Invalid login details",
      });
    }

    // check and compare password

    const correctPassword = await bcrypt.compare(password, adminExists.password);

    if (!correctPassword) {
      return res.status(httpStatus.NOT_EXTENDED).json({
        status: "Not Found",
        message: "Invalid password",
      });
    }

    // Create an authorization token for the user
    const token = jwt.sign(
      {
        id: adminExists._id,
        email: adminExists.email,
      },
      process.env.JWT_SECRET
    );

    return res.status(httpStatus.OK).json({
      status: "sucess",
      message: "Token created",
      userData: {
        id: adminExists._id,
        name: adminExists.username,
        email: adminExists.email,
      },
      authToken: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred while trying to login",
    });
  }
};


export { getUsers, getUser , getOneAdmin, deleteUser, updateAdmin, deleteAdmin , loginAdmin};
