import { AuthService } from 'src/app/shared/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

Validators
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){};
  msgError:string='';
  isLoading:boolean=false;

  registerForm:FormGroup=new FormGroup(
    {
      name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
      rePassword:new FormControl(''),
      phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),

    },{validators:[this.confirmPass]} as FormControlOptions
  );


confirmPass(group:FormGroup):void{
const password=group.get('password');
const rePassword=group.get('rePassword');

if(rePassword?.value==''){
  rePassword?.setErrors({required:true});
}
else if(password?.value!=rePassword?.value){

  rePassword?.setErrors({mismatch:true})

}
}

  handleForm():void{
    this.isLoading=true;
if (this.registerForm.valid){
      this._AuthService.setRegister(this.registerForm.value).subscribe({
      next:(response)=>{
        console.log(response);

        if(response.message=='success'){
          this.isLoading=false;
          this._Router.navigate(['/login'])
        }
        
      },
      error:(err: HttpErrorResponse) => {
        this.isLoading = false; 
        console.log(err);
        this.msgError = err.error.message;
      }
      
    })
}
else{
  this.registerForm.markAllAsTouched()
  this.isLoading=false
}
    
  }
  
}
