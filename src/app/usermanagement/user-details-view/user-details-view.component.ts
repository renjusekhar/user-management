import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';


interface UserDetail {
	id: string;
	name: string;
	avatar: string;
	email: string;
	status: string;
}

@Component({
	selector: 'app-user-details-view',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './user-details-view.component.html',
	styleUrls: ['./user-details-view.component.scss']
})
export class UserDetailsViewComponent implements OnInit {
	usersDataList = signal<UserDetail[]>([]);
	selectedUserId: string = '';
	selectedUser: UserDetail | null = null;

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

	ngOnInit(): void {
		this.userService.getUsers().subscribe((response: UserDetail[]) => {
			this.usersDataList.set(response);
			this.selectedUserId = this.route.snapshot.params['id'];
			this.updateSelectedUser();
		});
	}

	onUserSelect(): void {
		this.updateSelectedUser();
	}

	updateSelectedUser(): void {
		this.selectedUser = this.usersDataList().find((user: UserDetail) => user.id === this.selectedUserId) || null;
	}

	goBack(): void {
		this.router.navigate(['/table-view']);
	}

	previousUser(): void {
		const currentIndex = this.usersDataList().findIndex(user => user.id === this.selectedUserId);
		const previousIndex = (currentIndex === 0) ? this.usersDataList().length - 1 : currentIndex - 1;
		this.selectedUserId = this.usersDataList()[previousIndex].id;
		this.onUserSelect();
	}

	nextUser(): void {
		const currentIndex = this.usersDataList().findIndex(user => user.id === this.selectedUserId);
		const nextIndex = (currentIndex === this.usersDataList().length - 1) ? 0 : currentIndex + 1;
		this.selectedUserId = this.usersDataList()[nextIndex].id;
		this.onUserSelect();
	}
	getUserInitials(name: string): string {
		if (!name) return '';
		const names = name.split(' ');
		const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
		return initials;
	}
}
