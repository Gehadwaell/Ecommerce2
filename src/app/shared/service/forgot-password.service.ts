import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  baseURL:string=`https://ecommerce.routemisr.com/api/v1/auth/`

  constructor(private _HttpClient:HttpClient) { }

  forgotPass(userEmail:object):Observable<any>{
    return this._HttpClient.post(this.baseURL+`forgotPasswords`,userEmail)
  }

  resetCode(resetForm:object):Observable<any>{
    return this._HttpClient.post(this.baseURL+`verifyResetCode`,resetForm)
  }

  resetPass(resetPassForm:object):Observable<any>{
    return this._HttpClient.put(this.baseURL+`resetPassword`,resetPassForm)
  }
}
