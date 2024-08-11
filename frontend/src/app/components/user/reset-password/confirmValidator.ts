import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(password:string, confirmPassword:string){

         return (formGroup:FormGroup)=>{
           const pass = formGroup.controls[password];
           const cpass = formGroup.controls[confirmPassword];
           if(cpass.errors && !cpass.errors["confirmedValidator"]){
              return null
           } 
           if(pass.value !== cpass.value) {
            cpass.setErrors({ConfirmedValidator:true});
            return {ConfirmedValidator:true}
           } else {
            cpass.setErrors(null);
            return null
           }
         }
}
