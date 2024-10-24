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
  editingRowId: string | null = null; // Track the ID of the row being edited

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
    // Only navigate if not editing
    if (this.editingRowId !== user.id) {
      this.router.navigate(['/user', user.id]);
    }
  }

  editRow(userId: string) {
    // Set the current row to be editable
    this.editingRowId = userId;
    setTimeout(() => {
      // Focus on the first editable cell of the row
      const row = document.getElementById(`user-row-${userId}`);
      if (row) {
        const editableCells = row.querySelectorAll('.editable-cell');
        if (editableCells.length > 0) {
          // Cast to HTMLTableCellElement to access the focus method
          (editableCells[0] as HTMLTableCellElement).focus(); // Focus on the first editable cell
        }
      }
    }, 0); // Timeout to ensure the DOM updates before focusing
  }

  stopEditing() {
    // Stop editing the current row
    this.editingRowId = null;
  }

  // onEdit(user: User, key: string, event: Event) {
  //   // Update the user property with the edited value
  //   const target = event.target as HTMLTableCellElement;
  //   user[key] = target.innerText; // Update the user object with the new value
  // }
}
