import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {v4 as uuidv4} from "uuid";

dotenv.config()
const usersRouter = express.Router();

const secretkey = process.env.JWT_SECRET;

let users = [];

function verificarRol(rolesPermitidos){
    return function (req, res, next){
        const rolUsuario= req.headers['x-rol']
        if(rolesPermitidos.includes(rolUsuario)){
            next()
        }else{
            res.status(403)
        }
    }
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ") [1];
        jwt.verify(token, secretkey, (err, payload)=>{

            if(err){
                res.sendStatus(401)
            }
            req.user = payload;
            next()
        })
    }else{
        res.sendStatus(401)
    }
}

usersRouter.post('/', async(req, res) =>{
    const {name, lastname, email, username, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
        id: uuidv4(),
        name,
        lastname,
        email,
        username,
        password: hashedPassword
    }
    users.push(newUser)

    const {password: _, ...userWithoutPassword} = newUser;

    
    res.status(201).json(userWithoutPassword)
})

usersRouter.post('/login', async(req, res) =>{
    const {email, password} = req.body;

    const user = users.find(u => u.email === email);
    if(!user){
        res.status(404).json({message:"email not found"})
    }

    const validPassword = await bcrypt.compare(password, user.password )

    if(!validPassword){
        res.status(401).json({message:"wrong password"})
    }

    const token = jwt.sign({id: user.id, email:user.email},
    secretkey, {expiresIn:'1h'});

    res.status(200).json({token})
})

usersRouter.get('/',authenticateJWT, async(req, res) =>{
    console.log(req.user)
    const usersWithoutPassword = users.map(user =>{
        const {password, ...userWithoutPassword} = user;
        return userWithoutPassword
    })
    res.status(200).json(usersWithoutPassword)
})

export {usersRouter};