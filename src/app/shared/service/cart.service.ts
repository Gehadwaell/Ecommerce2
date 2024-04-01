
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNum:BehaviorSubject<number>=new BehaviorSubject(0);



  addToCart(ProductId:string):Observable<any>{


   let bodyObject:object={"productId": ProductId}

    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
    bodyObject
    )
  }

  getUserCart():Observable<any>{
return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  removeCart(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  updateCart(id:string,countNum:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{ count:countNum })
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  checkOut(id:string,orderInfo:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200/home`,
    {
      shippingAddress:orderInfo
  })
  }

  checkoutOrders(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }
}
