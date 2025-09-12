import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account.html',
  styleUrls: ['./account.scss']
})
export class AccountComponent implements OnInit {
  username: string | null = null;
  token: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.token = localStorage.getItem('jwt');
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
