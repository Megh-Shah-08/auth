const prompt = require("prompt-sync")(); //for allowing prompt command
const bcrypt = require("bcryptjs");

const userDB = []; //{username:"Megh Shah",password:"megh@1"} -> sample obj
//userDB is an array of object to save Users 

const registerUser = async (username,password)=> {
    const userExists = userDB.find(user => user.username===username)
    if(userExists){
        console.log("User already exists!\n");
        // appStart()
    }else{
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password,saltRounds);

        userDB.push({username:username,password:passwordHash});
        console.log("You are registered!\n");
        appStart();
    }
}

const loginUser = async (username,password) => {
    const userExists = userDB.find(user => user.username===username)
    if(!userExists){
        console.log("User doesn't exists!\n");
        console.log("Register First!\n");
        // appStart();
    }else{
        const user = userDB.find(user => user.username===username)
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(passwordCompare){
            console.log(`Welcome Back ${user.username}!\n`);
            return;
        }else{
            console.log("Incorrect Credentials!\n");
            console.log("Try Again!\n");
            // appStart();
        }
    }

}

const appStart = () => {
    console.log("\n****AUTH USING NodeJs!****");
    console.log("Enter 1 for SignUp -> Register User\n");
    console.log("Enter 2 for LogIn -> SignIn User\n");
    const option = prompt("Enter your choice : ");
    const Username = prompt("Enter your Username : ");
    const Password = prompt("Enter your Password : ");
    console.log(`Username : ${Username} \nPassword : ${Password}`);
    switch(option){
        case "1":
            registerUser(Username,Password);
            break;

        case "2":
            loginUser(Username,Password);
            break;
            
        default:
            console.log("Invalid Option!");
            // appStart()
    }
}


appStart();
