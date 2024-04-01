import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
constructor(private _ActivatedRoute:ActivatedRoute,private _CartService:CartService){};

cartId:any=''
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
       this.cartId= params.get('id')
      },
      error:()=>{}
    })
  }


  orderForm:FormGroup=new FormGroup({
    details:new FormControl(''),
    phone:new FormControl(''),
    city:new FormControl(''),

  })

  handleForm():void{
    console.log(this.orderForm.value);
    this._CartService.checkOut(this.cartId,this.orderForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.status=="success"){

          window.open(response.session.url,'_self')

        }
      },
      error:(err)=>{
        console.log(err);
        
      }

    })
    
  }

}
