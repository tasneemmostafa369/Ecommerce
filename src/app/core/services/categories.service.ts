import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient=inject(HttpClient)

  GetAllCategories():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v1/categories`)
  }

  getSpecificCategory(catId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v1/categories/${catId}`)
  }

  getAllSubCategories():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v1/subcategories`)
  }
  getAllSubCategoriesOnCategory(Id:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v1/categories/${Id}/subcategories`)
  }

 
}
