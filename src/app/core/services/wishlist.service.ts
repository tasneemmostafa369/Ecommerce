import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient)

  wishlistCount=signal<number>(0)

  addProductToWishlist(prodId:string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/wishlist`,
      {
        "productId": prodId
      }
    )
  }

  getloggeduserwishlist():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v1/wishlist`)
  }

  removeproductfromwishlist(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/api/v1/wishlist/${id}`)
  }
}
