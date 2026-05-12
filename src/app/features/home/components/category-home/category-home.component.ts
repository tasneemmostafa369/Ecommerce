import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { log } from 'console';
import { Category } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-category-home',
  imports: [],
  templateUrl: './category-home.component.html',
  styleUrl: './category-home.component.css',
})
export class CategoryHomeComponent implements OnInit{
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
