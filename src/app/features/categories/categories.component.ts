import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../cart/models/cart.interface';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private readonly categoriesService=inject(CategoriesService)
  categoryList=signal<Category[]>([])

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories():void{
    this.categoriesService.GetAllCategories().subscribe({
      next:(res)=>{
        this.categoryList.set(res.data)        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
