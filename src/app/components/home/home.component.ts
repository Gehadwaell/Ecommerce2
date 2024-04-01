import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { EcommDataService } from 'src/app/shared/service/ecomm-data.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
constructor(private _EcommDataService:EcommDataService,
  private _CartService:CartService,
  private _Renderer2:Renderer2,
  private _ToastrService:ToastrService,
  private _WishlistService:WishlistService
  ){};


products:Product[]=[];
categories:any[]=[];
wishlistItems:any={};
wishlistData:any[]=[];
ngOnInit(): void {
  this._EcommDataService.getAllProducts().subscribe({
    next:(response)=>{
      this.products=response.data
      
    }
  })

  this._EcommDataService.getCategories().subscribe({
    next:(response)=>{
    this.categories=response.data;

    }
  })


  this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
      console.log(response);
      const newData=response.data.map((item:any)=>item._id);
      this.wishlistData=newData;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

customOptions: OwlOptions = {
  autoplay:true,
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: false
}
mainSlider: OwlOptions = {
  autoplay:true,
  autoplaySpeed:1000,
  autoplayTimeout:7000,
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: false
}

searchTerm:string='';

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

addFav(id:string):void{
this._WishlistService.addTowishlist(id).subscribe({
  next:(response)=>{
    console.log(response);
    this._ToastrService.success(response.message);
    this.wishlistData=response.data;
    
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}

deleteItem(id:string):void{

  this._WishlistService.removeItem(id).subscribe({
    next:(response)=>{
      console.log('delete',response);
      this.wishlistItems=response.data;
      this._ToastrService.success(response.message);
      this.wishlistData=response.data;

      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}

