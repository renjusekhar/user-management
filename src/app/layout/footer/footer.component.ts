import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p>&copy; 2024 All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #333;
      color: white;
      padding: 10px;
      text-align: center;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  `]
})
export class FooterComponent {
}
