import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/shared/service/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
constructor(private _BrandsService:BrandsService){};

brandsData:any={};

ngOnInit(): void {
  this._BrandsService.getBrands().subscribe({
    next:(response)=>{
      console.log(response);
      this.brandsData=response.data
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}
