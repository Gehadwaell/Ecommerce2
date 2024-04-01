import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{

  constructor(private _CartService:CartService,private _ActivatedRoute:ActivatedRoute){}

allOrders:any={}
cartID:any=''
  ngOnInit(): void {
    // this._ActivatedRoute.paramMap.subscribe({
    //   next:(params)=>{
    //    this.cartID= params.get('id')
    //   },
    //   error:()=>{}
    // })
    
    // this._CartService.checkoutOrders(this.cartID).subscribe({
    //   next:(response)=>{
    //     console.log("cart",response);
    //     this.allOrders=response.data
    //     console.log(this.allOrders);
        
    //   },
    //   error:(err)=>{
    //     console.log(err);
        
    //   }
    // })
    
  }

}
