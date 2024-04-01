import { Product } from 'src/app/shared/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private _CartService:CartService,private _Renderer2:Renderer2){}

  empty:boolean=false;
  unempty:boolean=true;
  
  cartDetails:any={};
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(response)=>{
        this.cartDetails=response.data;
        
        
      },
      error:(err)=>{

        console.log(err);
        this.empty=true;
        this.unempty=false;
      }
    })
  }
  deleteItem(id:string,element:HTMLElement):void{
    this._Renderer2.setAttribute(element,"disabled","true");
    this._CartService.removeCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.cartDetails=response.data
        this._Renderer2.removeAttribute(element,"disabled");
        this._CartService.cartNum.next(response.numOfCartItems)

        
      },
      error:(err)=>{
        console.log(err);
        this._Renderer2.removeAttribute(element,"disabled");
        
      }
    })
  }
  changeCount(count:number,id:string,el1:HTMLButtonElement,el2:HTMLButtonElement):void{

   if(count>=1){
    this._Renderer2.setAttribute(el1,"disabled","true");
    this._Renderer2.setAttribute(el2,"disabled","true");
    this._CartService.updateCart(id,count).subscribe({
      next:(response)=>{
        console.log(response);
        this.cartDetails=response.data
        this._Renderer2.removeAttribute(el1,"disabled");
        this._Renderer2.removeAttribute(el2,"disabled");
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   } 

  }

  clearCart():void{
    this._CartService.clearCart().subscribe({
      next:(response)=>{
        console.log(response);
        if(response.message==="success"){
          this.cartDetails='';
          this._CartService.cartNum.next(0)
        }
        
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
  }


}
