import { Component, OnInit } from '@angular/core';

import { ProductsService } from './products.service';
import { Product } from './product.model';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit { 
    products: Product[] = []; 

    constructor(private productsService: ProductsService) {};

    ngOnInit() {
        this.productsService
            .fetchProducts()
            .subscribe(products => this.products = products);
    }   
}
