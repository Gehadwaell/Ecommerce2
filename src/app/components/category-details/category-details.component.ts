import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category';
import { EcommDataService } from 'src/app/shared/service/ecomm-data.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{

  categoryID:any='';
  categoryDetails:Category={} as Category

  constructor(private _ActivatedRoute:ActivatedRoute,private _EcommDataService:EcommDataService){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        params.get('id')
      }
    })

    this._EcommDataService.getCategoryDetails(this.categoryID).subscribe({
      next:(response)=>{
        console.log(response);  
        this.categoryDetails=response.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
