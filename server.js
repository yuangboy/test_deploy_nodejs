import express from "express";


const app=express();


app.get("/page",(req,res)=>{
    res.send("Bienvenue dans la page")
});

const PORT=3000;
app.listen(PORT, ()=>{console.log(`serveur lancé port: ${PORT}`);
});

