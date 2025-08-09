//generate token and inside it in cookies

const jwt=require("jsonwebtoken");
const logger=require("../startup/logging");
const db=require("../module/db");
const status=require("../utils/statuscode")

module.exports=async(req,res,next)=>{
    const token=req.header("Authorization").split(" ")[1];
    
    if(!token)return res.status(400).json({message:"some thing error in token",error:status(400)});
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        if(!decode)return res.status(403).send(status(403));
        
        const [result]=await db.query("SELECT * FROM Users WHERE id= ? ",[decode.id]);
        req.user=result[0];
        next();
    }catch(ex){
        logger.info(ex);
        res.status(400).json({status:status(400),error:ex});
    }
}




/*
const token = req.cookies.token;
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded; // 🔧 أنت تُعرّفها يدويًا
في هذا السيناريو، أنت تتحكم في محتوى req.user.






passport.serializeUser((user, done) => {
  // يُحدد ما يتم تخزينه داخل session
  done(null, user); // مثلًا user.id فقط إن أردت
});

passport.deserializeUser((obj, done) => {
  // عند كل طلب، يتم استخدام هذا لفك البيانات من session
  done(null, obj); // هذا هو ما يصبح req.user
});



👇 ما يحدث بالتفصيل:
عند تسجيل دخول المستخدم (مثلًا عبر Google)، ينفذ serializeUser:

يخزن user داخل الجلسة (session)

عند كل طلب لاحق بنفس الجلسة، ينفذ deserializeUser:

ويضع النتيجة في req.user

passport.serializeUser((user, done) => {
  // يتم حفظ ID فقط داخل الجلسة لتقليل الحجم
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // تسترجع بيانات المستخدم من قاعدة البيانات
  const user = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, user[0]); // هذا يصبح req.user
});


app.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'يجب تسجيل الدخول' });
  }

  res.json({
    name: req.user.displayName || req.user.name,
    email: req.user.email,
    picture: req.user.photo
  });
});

*/



/*

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Not authenticated' });
}
replace the auth middleware
*/