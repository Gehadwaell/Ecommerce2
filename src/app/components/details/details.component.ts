import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { EcommDataService } from 'src/app/shared/service/ecomm-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute,
  private _EcommDataService:EcommDataService,
  private _CartService:CartService,
  private _ToastrService:ToastrService,
  private _Renderer2:Renderer2){};

ProductDetails:Product={} as Product;
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
let productID:any=params.get('id');
this._EcommDataService.getProductDetails(productID).subscribe({
  next:(response)=>{this.ProductDetails=response.data;}
})
    }
  })
}

productSlider: OwlOptions = {
  autoplay:true,
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

}
