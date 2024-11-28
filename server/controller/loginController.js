let User=require('../model/userSchema')
let bcrypt=require('bcrypt')

exports.loginGet=async(req,res)=>{
  if(req.session.user)
  {
    res.redirect('/chat')
  }else{
       res.render('login')
  }
}
exports.loginPost=async(req,res)=>{
    try {
          const {email,password}=req.body;
          let findUser=await User.findOne({email})
          if(!findUser)
          {
            res.json({success:false,noUser:true})
          }
          const isMatch=await bcrypt.compare(password,findUser.password)
          if(isMatch)
          {
            req.session.user=findUser
            
            // const io=req.app.get('io')
            // io.on('connection',(socket)=>{
            //     findUser.socketId=socket.id
            //     findUser.save()
            //     console.log(`Socket ID for ${findUser.email}: ${socket.id}`);
            // })
            res.json({ success: true, message: "Login successful" ,login:true});
          }else{
            res.json({ success: false, message: "Invalid credentials", password: true });

          }

    } catch (error) {
        console.log(error);
    }
}
exports.signUp=async(req,res)=>{
    try {
        
        res.render('signup')
    } catch (error) {
        console.log(error)
    }
}

exports.signupPost=async(req,res)=>{
    try {
        const {Firstname,Lastname,email,password} = req.body
        
        let AlreadyUser=await User.findOne({email:email})
        if(AlreadyUser)
        {
            res.json({success:false,AlreadyUser:true,message:'Email Exists'})
        }
        
        let newUser=new User({
            firstName:Firstname,
            lastName:Lastname,
            email:email,
            password,
            isBlock:false
        })
        newUser.password=await bcrypt.hash(newUser.password,10)
        newUser.save()
        res.json({success:true,message:'sign up successfull'})
        
    } catch (error) {
        console.log(error);
        
    }
}

exports.home=async(req,res)=>{
    try {
        res.render('home')
    } catch (error) {
        console.log(error);
        
    }
}