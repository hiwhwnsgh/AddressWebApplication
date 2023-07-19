const express = require('express');
const cors = require("cors");
const uuid4 = require("uuid4");
const multer = require("multer");
const path = require("path");
const db = require('./config/db.js');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;
let imgName;
app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })) ;
app.use(express.json());
app.use(bodyParser.json());

const upload = multer({
    storage: multer.diskStorage({
        // 디렉토리 위치
        destination(req, file, cb) {
            cb(null, '../src/img');
        },
        // 파일명 
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const randomId = uuid4();
            imgName = randomId + ext;
            cb(null, imgName);
        },
    }),
    //파일 크기
    limits: { fileSize: 5 * 1024 * 1024 },
})

app.get('/',(req,res)=>{
    console.log("hello this is backend")
    res.json('hello this is backend');
})


// 주소록 리스트
app.get('/listSelect',(req,res)=>{
    console.log('Load AddressList');
    const sqlQuery = "select * from users order by firstName asc;"
    db.query(sqlQuery,(err,data)=>{
        if(!err){
            res.send(data);
        }
        else{
            console.log(err)
        }
    })
})


// 수정 할 데이터 로드
app.get('/readData',(req,res)=>{
    const id = req.query.id
    const sqlQuery = `select * from users where id=${id}`
    db.query(sqlQuery,(err,data)=>{
        if(!err){
            res.send(data);
        }
        else{
            console.log(err)
        }
    })
})


// 삽입
app.post('/insert',(req,res)=>{
    const sqlQuery = "insert into users(`firstname`,`lastname`,`job`,`phonenumber`,`email`,`emailDNS`,`image`) values(?);";
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.job,
        req.body.phonenumber,
        req.body.email,
        req.body.emailDNS,
        req.body.img,
    ]
    console.log(req.body.img);
    db.query(sqlQuery,[values],(err,result)=>{
        if(err) return res.json(err);
        res.send(result);
    })
})

// 프로필 수정
app.put('/update',(req,res)=>{
    const id = req.body.id;
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.job,
        req.body.phonenumber,
        req.body.email,
        req.body.emailDNS,
        req.body.img,
    ]
    console.log(values);
    const sqlQuery = `update users set firstName=?,lastName=?,job=?,phonenumber=?,email=?,emailDNS=?,image=? where id=${id}`;
    db.query(sqlQuery,[values[0],values[1],values[2],values[3],values[4],values[5],values[6]],(err,result)=>{
        if(err) return res.json(err);
        res.send(result);
    })
})

//주소록 삭제
app.delete('/delete',(req,res)=>{
    const id = req.body.params_id;
    const sqlQuery = `delete from users where id = ?;`
    db.query(sqlQuery,[id],(err,result)=>{
        if(err) return res.json(err);
        res.send(result);
    })
})

app.post("/upload", upload.single('img'), (req, res) => {
    res.send(imgName);
  });
app.listen(PORT,()=>{
    console.log(`Server On : http://localhost:${PORT}`);
})