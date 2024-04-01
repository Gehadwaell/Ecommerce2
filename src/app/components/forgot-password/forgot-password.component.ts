import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/shared/service/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

constructor(private _ForgotPasswordService:ForgotPasswordService,private _Router:Router){}

step1:boolean=true;
step2:boolean=false;
step3:boolean=false;
email:string='';
userMsg:string='';

forgotForm:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
})


resetCodeForm:FormGroup=new FormGroup({
  resetCode:new FormControl(''),
})

resetPassForm:FormGroup=new FormGroup({
  resetPass:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
})

forgotPass():void{

  let userEmail=this.forgotForm.value;
  this.email=userEmail.email;
  this._ForgotPasswordService.forgotPass(userEmail).subscribe({
next:(response)=>{
  console.log(response);
  this.userMsg=response.message;
  this.step1=false;
  this.step2=true;
  
},
error:(err)=>{
  console.log(err);
  this.userMsg=err.error.message
  
}
})
}

resetCode():void{

let resetCode=this.resetCodeForm.value  
this._ForgotPasswordService.resetCode(resetCode).subscribe({
  next:(response)=>{
    this.userMsg=response.status;
    this.step2=false;
    this.step3=true;
    console.log(response);
    
  },

  error:(err)=>{
console.log(err);
this.userMsg=err.error.message;

  }
})
}

resetPass():void{

 let resetPassForm=this.resetPassForm.value;
 resetPassForm.email=this.email
this._ForgotPasswordService.forgotPass(resetPassForm).subscribe({
  next:(response)=>{
console.log(response);
if(response?.token){

  localStorage.setItem('eToken',response.token);
  this._Router.navigate(["/home"])

}

  },
  error:(err)=>{
console.log(err);
this.userMsg=err.error.message;

  }
})
}
}




