import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  cartDetails:any={};
  wishlistItems:any={};
  count:number=0;
  empty:boolean=false

  constructor(private _WishlistService:WishlistService,private _CartService:CartService,private _Renderer2:Renderer2,private _ToastrService:ToastrService){}

  ngOnInit(): void {

    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        console.log(response);
        this.wishlistItems=response.data;
        this.count=response.count     
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    this._CartService.getUserCart().subscribe({
      next:(response)=>{
        this.cartDetails=response.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }

  addCart(id:string,element:HTMLButtonElement):void{

    this._Renderer2.setAttribute(element,'disabled','true'); 
    this._CartService.addToCart(id).subscribe({
        next:(response)=>{
          console.log(response);
          this._ToastrService.success(response.message);
          this._Renderer2.removeAttribute(element,'disabled');
          this._CartService.cartNum.next(response.numOfCartItems)
    
        },
        error:(err)=>{
    console.log(err);
    this._Renderer2.removeAttribute(element,'disabled');
    
        }
      });
    }

  deleteItem(id:string,element:HTMLElement):void{
    this._Renderer2.setAttribute(element,"disabled","true");
    this._WishlistService.removeItem(id).subscribe({
      next:(response)=>{
        console.log('delete',response);
        this.wishlistItems=response.data;
        this._ToastrService.success(response.message)

        
      },
      error:(err)=>{
        console.log(err);
        this._Renderer2.removeAttribute(element,"disabled");
        
      }
    })
  }

}