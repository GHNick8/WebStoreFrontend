import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, RouterModule, CurrencyPipe]
})
export class HomeComponent implements OnInit {
  username: string | null = null;

  featured: Product[] = [];

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.ps.getAll().subscribe(prods => {
      this.featured = prods.slice(0, 2);
    });
  }
}
