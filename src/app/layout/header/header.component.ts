import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDarkTheme: boolean = false; 

  constructor(private renderer :Renderer2){}
  toggleTheme(): void {
    if (this.isDarkTheme) {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.addClass(document.body, 'light-theme');
    } else {
      this.renderer.removeClass(document.body, 'light-theme');
      this.renderer.addClass(document.body, 'dark-theme');
    }
    this.isDarkTheme = !this.isDarkTheme;
  }
}