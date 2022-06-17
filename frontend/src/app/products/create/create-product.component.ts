import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit { 

    constructor(
      private productsService: ProductsService, 
      private router: Router) {};

    ngOnInit() {}

    onCreateProduct(product: Product) {
      this.productsService.create(product.productName, product.amount);
      setTimeout(() => {
        this.router.navigateByUrl('products');
      }, 400);      
    }
}
