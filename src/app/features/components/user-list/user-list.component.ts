import { Component, OnInit, signal, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { catchError, debounceTime } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { User } from '../../types/user.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users = signal<User[]>([]);
  filteredUsers = signal<User[]>([]);
  headers = signal<string[]>([]);
  editListId: string | null = null;
  searchTerm = '';
  searchSubject = new Subject<string>();
  @ViewChildren('user') userRows!: QueryList<ElementRef>;
  @ViewChildren('editableRow') editableRow!: QueryList<ElementRef>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    ).subscribe((response: User[]) => {
      if (Array.isArray(response) && response.length > 0) {
        this.users.set(response);
        this.filteredUsers.set(response);
        this.headers.set(Object.keys(response[0]));
      } else {
        console.warn('Received response is not a valid user array or is empty');
      }
    });
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.filterUsers();
    });
  }

  debouncedFilterUsers() {
    this.searchSubject.next(this.searchTerm); 
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    const filtered = this.users().filter(user =>
      Object.values(user).some(value =>
        String(value).toLowerCase().includes(term)
      )
    );
    this.filteredUsers.set(filtered);
  }

  navigateToUserDetails(user: User) {
    if (this.editListId !== user.id) {
      this.router.navigate(['/user', user.id]);
    }
  }

  editList(userId: string) {
    this.editListId = this.editListId === userId ? null : userId;
    const selectedRow = this.userRows.find((row) => row.nativeElement.id === `user-row-${userId}`);
    if (selectedRow) {
      const editableRow = selectedRow.nativeElement.querySelectorAll('.editable-cell');
      if (editableRow.length > 0) {
        requestAnimationFrame(() => {
          (editableRow[0] as HTMLInputElement).focus();
        });
      }
    }
  }
}
