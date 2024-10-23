import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ScrollingModule } from '@angular/cdk/scrolling';  
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-table-view',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatIconModule],
  templateUrl: './user-table-view.component.html',
  styleUrls: ['./user-table-view.component.scss'] 
})
export class UserTableViewComponent implements OnInit {
  users: any[] = [];
  headers: string[] = [];
  darkModeEnabled: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        this.router.navigate(['/no-data-found']); 
        return of([]);
      })
    ).subscribe((data) => {
      if (data.length > 0) {
        this.users = data;
        this.headers = Object.keys(this.users[0]);
      } else {
        this.router.navigate(['/no-data-found']);
      }
    });
  }

  onRowClick(user: any) {
    this.router.navigate(['/user', user.id]);
  }

  onEdit(user: any, key: string) {
    user[key] = user; 
  }
}