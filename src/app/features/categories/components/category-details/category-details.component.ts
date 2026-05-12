import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../../../../core/models/category.interface';

@Component({
  selector: 'app-category-details',
  imports: [RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  private readonly activatedRoute = inject(ActivatedRoute)
  catId = signal<string>('')
  categoryName = signal<string>('');

  categoryImage = signal<string>('');

  subCategories = signal<Category[]>([]);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.catId.set(params.get('id')!)
    })

    this.getspcificCategory(this.catId())
  }

  getspcificCategory(id: string): void {
    this.categoriesService.getSpecificCategory(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoryName.set(res.data.name);
        this.categoryImage.set(res.data.image);


      }


    })

    this.categoriesService.getAllSubCategoriesOnCategory(id).subscribe({
      next: (res) => {
        this.subCategories.set(res.data);
      },

    });
  }

}
