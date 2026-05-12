import { Component, inject, OnInit, signal } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { log } from 'console';
import { RouterLink } from "@angular/router";
import { Brand } from '../../core/models/brand.interface';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit{
  private readonly brandService=inject(BrandService)
  brandList=signal<Brand[]>([])

  ngOnInit(): void {
    this.getAllBrands()
  }

  getAllBrands():void{
    this.brandService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.brandList.set(res.data)
      }
    })
  }

}
