//instal nodemon 
// ctrl + alt + L = console debug variable 
// setting di Package.json
//"scripts": {
//   "dev": "nodemon index.js",
//   "test": "echo \"Error: no test specified\" && exit 1"
// },

const {MainConnection} = require('./src/Connection')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploads = require('./src/UploadMiddleware');
const sql = require('mssql');

const {Auth}  = require('./src/Auth')
require('dotenv').config()

app.use(express.json())
// Cari Port Yang Kosong 

////// Add headers cors header 
app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*') //FIXME
  // res.setHeader('Access-Control-Allow-Origin', 'https://erecruit.azurewebsites.net')

  // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') //FIXME
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // res.setHeader('Access-Control-Allow-Headers', '*') //FIXME
  res.setHeader('Access-Control-Allow-Headers', 'x-auth-token, content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', false)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

// app.use(express.static('public'));
app.use('/ReturnImage',express.static('uploads'))

app.listen(process.env.PORT,()=> console.log("server run port " + process.env.PORT ))




function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKENKEY, { expiresIn: '3600s' });
}



//// upload multi field 
  const storage = multer.diskStorage({
    destination : function(req,file,cb){
      cb(null, "uploads/")
  },
  filename: function(req,file,cb){ 
     Date.now()+file.originalname.replace(/\s/g,'')
      cb(null,Date.now()+file.originalname.replace(/\s/g,''))
  }
  })
  const upload = multer({
    storage : storage
  })

  //// upload multi field 



  // const upl = upload.fields([{name : 'image1'},{name : 'image2'}])

  const resultLogin = {
    Status : null,
    Message : null,
    Token : null,
    Result : null,   
  }

  const result = {
    Status : null,
    Message : null,
    Result : null,   
  }
  
try {
  // app.post('/UploadFileMultiField',upl, async function(req,res){

  // try {
  //   result.Status = 1
  //   result.Result = null
  //   result.Message  ="image1 " +  req.files.image1[0].filename + "image 2 " +  req.files.image2[0].filename
  //   
  // } catch (error) {
  //   result.Status = 0
  //   result.Result = null
  //   result.Message  = error["originalError"]["info"]["message"]
  //   
  // }
  // return res.status(200).json(result)

  // })


  app.post('/UploadImage', uploads.single('image'), async function (req, res) {
  try {
    result.Status = 1
    result.Result = null
    result.Message  = req.file.filename
    
  } catch (error) {
    result.Status = 0
    result.Result = null
    result.Message  = error
    
  }
  return res.status(200).json(result)
  });
  



  app.post('/Api/Login',async (req,res) => {
    try {
      const {
        Username,
        Password
    } = req.body
    const Conn = await MainConnection();
    const {err, recordsets} = await Conn.query(`exec LoginUser @Code=${Username},@Password=${Password}`);
    if (recordsets.length > 0) {
      const TokenFromServer =  generateAccessToken({ username: req.body.Username });
      resultLogin.Status = 1
      resultLogin.Result = recordsets
      resultLogin.Message  = "Success"
      resultLogin.Token = TokenFromServer
    } else {
      resultLogin.Status = 0
      resultLogin.Result = null
      resultLogin.Message  = "Please Check Your User And Password"
    }
    return res.status(200).json(resultLogin)
    } catch (error) {
      resultLogin.Status = 0
      resultLogin.Result = null
      resultLogin.Message  = error.message
      return res.status(400).json(resultLogin)
    }
  })



  

app.post('/Api/GetProfile', Auth ,async (req,res) => {
  try {
    const {
      Code
  } = req.body
  const Conn = await MainConnection();
  const {err, recordsets} = await Conn.query(`exec [TransactionTicketing] @Param='DetailProfile',@Code=${Code}`);
    result.Status = 1;
    result.Message = "Success";
    result.Result = recordsets;
    
  return res.status(200).json(result)
  } catch (error) {
  result.Status = 0;
  result.Message = error["originalError"]["info"]["message"];
  result.Result = null;
  
    return res.status(400).json(result)
  }
})



app.post('/Api/GetNotification', Auth ,async (req,res) => {
  try {
    const {
      Code
  } = req.body
  const Conn = await MainConnection();
  const {err, recordsets} = await Conn.query(`exec [TransactionNotification] @Param='GetNotification',@NIK=${Code}`);
    result.Status = 1;
    result.Message = "Success";
    result.Result = recordsets;
    result.TotalNotif = recordsets[0].length;
    
  return res.status(200).json(result)
  } catch (error) {
  result.Status = 0;
  result.Message = error["originalError"]["info"]["message"];
  result.Result = null;
  
    return res.status(400).json(result)
  }
})


app.post('/Api/AssignTicket',Auth,async function(req,res){
  try {
    const {
      NikTechnician,
      Code,
      IdTicket
    } = req.body;
  
    const Conn = await MainConnection();
    Conn.input('Param',sql.VarChar(255),'AssignTicket')
    Conn.input('NikTechnician',sql.VarChar(255),NikTechnician)
    Conn.input('Code',sql.VarChar(255),Code)
    Conn.input('IdTicket',sql.VarChar(255),IdTicket)
    Conn.execute('TransactionTicketing').then(function(respon){
      result.Status = 1
      result.Result = null
      result.Message  ="Success Assign Ticket";
      return res.status(200).json(result)
    }).catch(function(err) {
      result.Status = 0
      result.Result = null
      result.Message  =err.message;
      return res.status(200).json(result)
    });
  
  } catch (error) {
    result.Status = 0;
    result.Message = error["originalError"]["info"]["message"];
    result.Result = null;
      return res.status(400).json(result)
  }
  })


  app.post('/Api/GetHistoryAssigmentTicket',Auth,async function(req,res){
    try {

      const Conn = await MainConnection();
      Conn.input('Param',sql.VarChar(255),'GetHistoryAssigmentTicket')
      Conn.execute('TransactionTicketing').then(function(respon){
        result.Status = 1
        result.Result = respon.recordset
        result.Message  ="Success GetHistoryAssigmentTicket";
        return res.status(200).json(result)
      }).catch(function(err) {
        result.Status = 0
        result.Result = null
        result.Message  =err.message;
        return res.status(200).json(result)
      });
    
    } catch (error) {
      result.Status = 0;
      result.Message = error["originalError"]["info"]["message"];
      result.Result = null;
        return res.status(400).json(result)
    }
    })




  app.post('/Api/RejectTicket',Auth,async function(req,res){
    try {
      const {
        ReasonReject,
        NikTechnician,
        IdTicket
      } = req.body;
    
      const Conn = await MainConnection();
      Conn.input('Param',sql.VarChar(255),'RejectTicket')
      Conn.input('ReasonReject',sql.Text,ReasonReject)
      Conn.input('NikTechnician',sql.VarChar(255),NikTechnician)
      Conn.input('IdTicket',sql.VarChar(255),IdTicket)
      Conn.execute('TransactionTicketing').then(function(respon){
        result.Status = 1
        result.Result = null
        result.Message  ="Success Reject Ticket";
        return res.status(200).json(result)
      }).catch(function(err) {
        result.Status = 0
        result.Result = null
        result.Message  =err.message;
        return res.status(200).json(result)
      });
    } catch (error) {
      result.Status = 0;
      result.Message = error["originalError"]["info"]["message"];
      result.Result = null;
        return res.status(400).json(result)
    }
    })


  app.post('/Api/InputResolutionTicket',Auth,async function(req,res){
    try {
      const {
        ResolutionTicket,
        Code,
        IdTicket
      } = req.body;
    
      const Conn = await MainConnection();
      Conn.input('Param',sql.VarChar(255),'InputResolutionTicket')
      Conn.input('ResolutionTicket',sql.Text,ResolutionTicket)
      Conn.input('Code',sql.VarChar(255),Code)
      Conn.input('IdTicket',sql.VarChar(255),IdTicket)
      Conn.execute('TransactionTicketing').then(function(respon){
        result.Status = 1
        result.Result = null
        result.Message  ="Success Input Resolution Ticket";
        return res.status(200).json(result)
      }).catch(function(err) {
        result.Status = 0
        result.Result = null
        result.Message  =err.message;
        return res.status(200).json(result)
      });
    
    } catch (error) {
      result.Status = 0;
      result.Message = error["originalError"]["info"]["message"];
      result.Result = null;
        return res.status(400).json(result)
    }
    })


    app.get('/Api/GetTechnician',Auth,async function(req,res){
      try {
        const Conn = await MainConnection();
        Conn.input('Param',sql.VarChar(255),'GetTechnician')
        Conn.execute('TransactionTicketing').then(function(respon){
          result.Status = 1
          result.Result = respon.recordset
          result.Message  ="Success GetTechnician";
          return res.status(200).json(result)
        }).catch(function(err) {
          result.Status = 0
          result.Result = null
          result.Message  =err.message;
          return res.status(200).json(result)
        });
      
      } catch (error) {
        result.Status = 0;
        result.Message = error["originalError"]["info"]["message"];
        result.Result = null;
          return res.status(400).json(result)
      }
      })





app.post('/Api/GetTicketDetail',Auth,async function(req,res){
  try {
    const {
Id
    } = req.body;
  
    const Conn = await MainConnection();
    Conn.input('Param',sql.VarChar(255),'GetTicketDetail')
    Conn.input('IdTicket',sql.VarChar(255),Id)
    Conn.execute('TransactionTicketing').then(function(respon){
      result.Status = 1
      result.Result = respon.recordset
      result.Message  ="Success Get Ticket";
      return res.status(200).json(result)
    }).catch(function(err) {
      result.Status = 0
      result.Result = null
      result.Message  =err.message;
      return res.status(200).json(result)
    });
  
  } catch (error) {
    result.Status = 0;
    result.Message = error["originalError"]["info"]["message"];
    result.Result = null;
      return res.status(400).json(result)
  }
  })



  app.post('/Api/GetListPickTicket',Auth,async function(req,res){
    try {
      
      const {
        NikTechnician
      } = req.body;
    
      const Conn = await MainConnection();
      Conn.input('Param',sql.VarChar(255),'GetListPickTicket')
      Conn.input('NikTechnician',sql.VarChar(255),NikTechnician)
      Conn.execute('TransactionTicketing').then(function(respon){
        // console.log("recordsets",err)
        result.Status = 1
        result.Result = respon.recordset
        result.Message  ="Success Get Ticket";
        return res.status(200).json(result)
      }).catch(function(err) {
        result.Status = 0
        result.Result = null
        result.Message  =err.message;
        return res.status(200).json(result)
      });
    
    } catch (error) {
      result.Status = 0;
      result.Message = error["originalError"]["info"]["message"];
      result.Result = null;
        return res.status(400).json(result)
    }
    })



app.post('/Api/GetTicket',Auth,async function(req,res){
try {
  
  const {
    IsHelpdesk,
    CreatedByFT
  } = req.body;

  const Conn = await MainConnection();
  Conn.input('Param',sql.VarChar(255),'GetTicket')
  Conn.input('IsHelpdesk',sql.VarChar(255),IsHelpdesk)
  Conn.input('CreatedByFT',sql.VarChar(255),CreatedByFT)
  Conn.execute('TransactionTicketing').then(function(respon){
    // console.log("recordsets",err)
    result.Status = 1
    result.Result = respon.recordset
    result.Message  ="Success Get Ticket";
    return res.status(200).json(result)
  }).catch(function(err) {
    result.Status = 0
    result.Result = null
    result.Message  =err.message;
    return res.status(200).json(result)
  });

} catch (error) {
  result.Status = 0;
  result.Message = error["originalError"]["info"]["message"];
  result.Result = null;
    return res.status(400).json(result)
}
})


app.post('/Api/InsertTicket',Auth, upload.fields([{name : 'image'}]), async function(req,res){

try {
  const {      IdCategoryFT,
    SubjectFT,
    DescriptionFT,
    CreatedByFT} = req.body;
      const request = await MainConnection();
      var File = req.files ? req.files.image ? req.files.image : null : null;
      var ImageName = File ? File[0].filename : "-" ;  
    request.input('Param', sql.VarChar(255), 'InsertFormTicket');
    request.input('IdCategoryFT', sql.VarChar(255), IdCategoryFT);
    request.input('SubjectFT', sql.VarChar(255), SubjectFT);
    request.input('DescriptionFT', sql.Text, DescriptionFT);
    request.input('CreatedByFT', sql.VarChar(255), CreatedByFT);
    request.input('AttachmentFT', sql.VarChar(255), ImageName);
    request.execute('TransactionTicketing').then(function(err, recordsets, returnValue, affected) {

      result.Status = 1
      result.Result = null
      result.Message  ="Success Insert";
      return res.status(200).json(result)
    }).catch(function(err) {
      result.Status = 0
      result.Result = null
      result.Message  =err.message;
      return res.status(200).json(result)
    });

} catch (error) {
  result.Status = 0;
    result.Message = error["originalError"]["info"]["message"];
    result.Result = null;
    
      return res.status(400).json(result)
}


})





app.get('/Api/GetTicketCategories', Auth ,async (req,res) => {
  try {
  const Conn = await MainConnection();
  const {err, recordsets} = await Conn.query(`exec [TransactionTicketing] @Param='GetTicketCategories'`);  
    result.Status = 1;
    result.Message = "Success";
    result.Result = recordsets;
    
    

  return res.status(200).json(result)
  } catch (error) {
  result.Status = 0;
  result.Message = error["originalError"]["info"]["message"];
  result.Result = null;
  
    return res.status(400).json(result)

  }
})










}

catch(err){
console.log("🚀 ~ file: index.js ~ line 66 ~ err", err)

}