export class userRegisterModel {
    name !: string;
    email !: string;
    password !: string;
    mobile !: string;
    address !: string;
    pinCode !:number;
    city!:string;
    state!:string;
    landMark!:string;
    alternatePhone!:string;
    
 }
 
 export class userLoginModel {
    email : string | undefined;
    password : string | undefined;
 }
 