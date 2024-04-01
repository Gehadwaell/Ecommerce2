import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category';
import { EcommDataService } from 'src/app/shared/service/ecomm-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  constructor(private _EcommDataService:EcommDataService){}
  
  categoryData:Category[]=[]
  ngOnInit(): void {
    this._EcommDataService.getCategories().subscribe({
      next:(response)=>{
        console.log(response);
        this.categoryData=response.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
