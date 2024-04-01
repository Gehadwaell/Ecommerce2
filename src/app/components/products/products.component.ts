import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { EcommDataService } from 'src/app/shared/service/ecomm-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

constructor(private _EcommDataService:EcommDataService,
  private _CartService:CartService,  
  private _Renderer2:Renderer2,
  private _ToastrService:ToastrService){}

products:Product[]=[];
searchTerm:string='';
pageSize:number=0;
currentPage:number=1;
total:number=0

ngOnInit(): void {
  this._EcommDataService.getAllProducts().subscribe({
    next:(response)=>{
      this.products=response.data;
      this.pageSize=response.metadata.limit;
      this.currentPage=response.metadata.currentPage;
      this.total=response.results
      
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

pageChanged(event:any):void{
  console.log(event);
  this._EcommDataService.getAllProducts(event).subscribe({
    next:(response)=>{
      this.products=response.data;
      this.pageSize=response.metadata.limit;
      this.currentPage=response.metadata.currentPage;
      this.total=response.results
      
    }
  })
  
}

}


