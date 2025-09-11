import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  onSubmit() {
    alert(`Thank you, ${this.name}! This is a demo form, no real message was sent.`);
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
