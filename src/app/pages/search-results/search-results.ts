import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgIf } from '@angular/common';
/*
@Component({
  selector: 'app-search-results',
  imports: [CommonModule],
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.scss']
})
export class SearchResultsComponent implements OnInit {
  results: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query) {
        this.productService.searchProducts(query).subscribe(data => {
          this.results = data;
        });
      }
    });
  }
}
*/