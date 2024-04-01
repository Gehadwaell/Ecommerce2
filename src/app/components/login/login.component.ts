import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService,private _Router:Router,private _FormBuilder:FormBuilder){};
  msgError:string='';
  isLoading:boolean=false;

  loginForm:FormGroup=this._FormBuilder.group({
    email:['' ,[Validators.required,Validators.email]],
    password:['' ,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })

  // loginForm:FormGroup=new FormGroup(
  //   {
  //     email:new FormControl('',[Validators.required,Validators.email]),
  //     password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),

  //   }
  // );

  handleForm():void{
    this.isLoading=true;
if (this.loginForm.valid){
      this._AuthService.setLogin(this.loginForm.value).subscribe({
      next:(response)=>{
        console.log(response);

        if(response.message=='success'){
          localStorage.setItem('eToken',response.token);
          this._AuthService.saveUserData();
          this.isLoading=false;
          this._Router.navigate(['/home'])
        }
        
      },
      error:(err:HttpErrorResponse
        )=>{
this.isLoading=false
console.log(err);
this.msgError=err.error.message

      }
    })
}
else{
  this.loginForm.markAllAsTouched();
  this.isLoading=false
}
    
  }

}
