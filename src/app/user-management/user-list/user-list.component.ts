import { Component, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ScrollingModule } from '@angular/cdk/scrolling';  
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  status: string;
}
@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'] 
})
export class UserListComponent implements OnInit {
  users = signal<User[]>([]);
  headers = signal<string[]>([]); 
  editListId: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    ).subscribe((response) => {
      if (response.length > 0) {
        this.users.set(response);  
        this.headers.set(Object.keys(response[0]));
      } 
    });
  }

  navigateToUserDetails(user: User) {
    if (this.editListId !== user.id) {
      this.router.navigate(['/user', user.id]);
    }
  }

  editList(userId: string) {
    this.editListId = userId;
    setTimeout(() => {
      const row = document.getElementById(`user-row-${userId}`);
      if (row) {
        const editableCells = row.querySelectorAll('.editable-cell');
        if (editableCells.length > 0) {
          (editableCells[0] as HTMLTableCellElement).focus();
        }
      }
    }, 0); 
  }
}
