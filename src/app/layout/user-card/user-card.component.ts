import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-user-card',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: any;

  getUserInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('');
  }
}
