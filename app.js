const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.json());
const q = mysql.createConnection({
    host:"localhost" ,
    database:"productapi",
    user:"root",
    password:""
})

app.post("/products" , (req,res)=>{
    const {name , price , description} = req.body ;
    q.execute(`insert into products (name , price , description) values('${name}' , ${price} , '${description}')` , (err,result)=>{

        q.execute(`select * from products ` , (err,result)=>{
res.json({messege : "success" , result})
        })
    }) ;
    
})

app.get('/products' , (req,res)=>{
    q.execute(`select * from products ` , (err,result)=>{
        res.json({messege:"success" , result})
    })

})

app.put('/products' , (req,res)=>{
    const {id , name , price ,description} = req.body ;
    q.execute(`update products set name = '${name}' , price = ${price} , description = '${description}' where id = ${id} ` , (err,result)=>{
        q.execute(`select * from products` , (err,result)=>{
            res.json({messege:"success" , result})
        })
    })

})

app.delete("/products" , (req,res)=>{

    const {id} = req.body ; 
    q.execute(`delete from products where id = ${id}` , (err,result)=>{
        q.execute(`select * from products` , (err,result)=>{
            res.json({messege:"success" , result})
        })
    })
})

app.get(`/searchProduct` , (req,res)=>{

    const {name} = req.body ;
    q.execute(`select * from products where name like '%${name}%' ` , (err,result)=>{
        res.json({messege:"success" , result})
    })

} )



app.listen(3002 , ()=>{
    console.log("server is running yasta");
})