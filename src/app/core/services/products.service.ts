import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient=inject(HttpClient)

  // getAllProducts():Observable<any>{
  //   return this.httpClient.get(environment.baseUrl+`/api/v1/products`)
  // }
  getAllProducts(catId: string = ''): Observable<any> {
  let url = environment.baseUrl + `/api/v1/products`;
  if (catId) {
    url += `?category[in]=${catId}`; // API الرووت بيستخدم التنسيق ده للفلترة بالأب
  }
  return this.httpClient.get(url);
}

  getSpecificProduct(productId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v1/products/${productId}`)
  }

 
}
