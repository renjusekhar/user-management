import { Component, OnInit, QueryList, ViewChildren, ElementRef, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserStateService } from '../../services/user-state.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../types/user.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule, 
            MatIconModule, FormsModule, 
            MatFormFieldModule, MatInputModule,
            MatTooltipModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @ViewChildren('user') userRows!: QueryList<ElementRef>;
  @ViewChildren('editableRow') editableRow!: QueryList<ElementRef>;
  private userStateService = inject(UserStateService)
  private router = inject(Router)
  private searchSubject = new Subject<string>();
  protected editListId: string | null = null;
  protected searchTerm: string = '';
  protected sortField: string = 'name';
  protected sortAscending: boolean = true;
  protected readonly headers = this.userStateService.headers;
  protected readonly users = this.userStateService.users;


  ngOnInit(){
    this.userStateService.getAllUsers();
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchTerm) => {
      this.userStateService.filterUsers(searchTerm);
    });
  }
 
  searchUsers() {
    this.searchSubject.next(this.searchTerm);
  }

  navigateToUserDetails(user: User) {
    if (this.editListId !== user.id) {
      this.router.navigate(['/user', user.id]);
    }
    }  

  editUser(userId: string) {
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

  toggleSort() {
    this.sortAscending = !this.sortAscending;
    this.userStateService.sortUsers(this.sortField as keyof User, this.sortAscending);
  }
}
