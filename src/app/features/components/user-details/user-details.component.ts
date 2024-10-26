import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../services/user-state.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../types/user.model';
import { UserCardComponent } from '../../../layout/user-card/user-card.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule, UserCardComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)

	private readonly userStateService = inject(UserStateService)
  protected selectedUserId: string = '';
  protected selectedUser = signal<User | null>(null); 
  protected readonly users = this.userStateService.users;

   ngOnInit() {
    this.userStateService.getAllUsers();
    this.route.paramMap.subscribe(params => {
      this.selectedUserId = params.get('id') || '';
      this.updateSelectedUser(); 
    });
  }

  updateSelectedUser(): void {
    const user = this.users().find((user: User) => user.id === this.selectedUserId);
    if (user) {
	  this.selectedUser.set(user); 
      this.router.navigate(['/user', user.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }

  selectPreviousUser(): void {
    const currentIndex = this.users().findIndex(user => user.id === this.selectedUserId);
    const previousIndex = (currentIndex === 0) ? this.users.length - 1 : currentIndex - 1;
    this.selectedUserId = this.users()[previousIndex].id;
    this.updateSelectedUser();
  }

  selectNextUser(): void {
    const currentIndex = this.users().findIndex(user => user.id === this.selectedUserId);
    const nextIndex = (currentIndex === this.users.length - 1) ? 0 : currentIndex + 1;
    this.selectedUserId = this.users()[nextIndex].id;
    this.updateSelectedUser(); 
  }

  getUserInitials(name: string): string {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(name => name.charAt(0).toUpperCase()).join('');
    return initials;
  }
}
