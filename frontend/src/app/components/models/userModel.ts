export class userRegisterModel {
    value(value: any) {
      throw new Error('Method not implemented.');
    }
    reset() {
      throw new Error('Method not implemented.');
    }
    name !: string;
    email !: string;
    password !: string;
    mobile !: string;
    address !: string;
    pinCode !:number;
    city!:string;
    state!:string;
    alternatePhone!:string;
    
 }
 
 export class userLoginModel {
    email : string | undefined;
    password : string | undefined;
 }
 