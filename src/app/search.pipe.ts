import { Product } from 'src/app/shared/interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[] , term:string):Product[] {
    console.log(term);
    
    
    return products.filter((item)=>{item.title.toLowerCase().includes(term.toLowerCase())});
  }

}
