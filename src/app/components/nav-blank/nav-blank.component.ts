import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';
@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit{
constructor(private _AuthService:AuthService,private _CartService:CartService,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}
cartNum:number=0;
wishnum:number=0;

@ViewChild('navBar') navElment!:ElementRef

@HostListener('window:scroll')
onscroll():void{
  if(scrollY>300){

    this._Renderer2.addClass(this.navElment.nativeElement,'px-5');
    this._Renderer2.addClass(this.navElment.nativeElement,'shadow')

  }
  else{
    this._Renderer2.removeClass(this.navElment.nativeElement,'px-5')
    this._Renderer2.removeClass(this.navElment.nativeElement,'shadow')
  }
}


ngOnInit(): void {
  this._CartService.cartNum.subscribe({
    next:(data)=>{
      console.log(data);
      this.cartNum=data
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })

  this._CartService.getUserCart().subscribe({
    next:(response)=>{
this.cartNum=response.numOfCartItems
    }
  })
  this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
      console.log(response);
      this.wishnum=response.count
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

  logOutUser():void{
this._AuthService.logOut();

  }


}
