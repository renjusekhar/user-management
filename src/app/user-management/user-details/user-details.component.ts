import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';


interface User {
	id: string;
	name: string;
	avatar: string;
	email: string;
	status: string;
}

@Component({
	selector: 'app-user-details',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
	users = signal<User[]>([]);
	selectedUserId: string = '';
	selectedUser: User | null = null;

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

	ngOnInit(): void {
		this.userService.getUsers().subscribe((response: User[]) => {
			this.users.set(response);
			this.selectedUserId = this.route.snapshot.params['id'];
			this.updateSelectedUser();
		});
	}

	selectUser(): void {
		this.updateSelectedUser();
	}

	updateSelectedUser(): void {
		this.selectedUser = this.users().find((user: User) => user.id === this.selectedUserId) || null;
	}

	goBack(): void {
		this.router.navigate(['/list']);
	}

	selectPreviousUser(): void {
		const currentIndex = this.users().findIndex(user => user.id === this.selectedUserId);
		const previousIndex = (currentIndex === 0) ? this.users().length - 1 : currentIndex - 1;
		this.selectedUserId = this.users()[previousIndex].id;
		this.selectUser();
	}

	selectNextUser(): void {
		const currentIndex = this.users().findIndex(user => user.id === this.selectedUserId);
		const nextIndex = (currentIndex === this.users().length - 1) ? 0 : currentIndex + 1;
		this.selectedUserId = this.users()[nextIndex].id;
		this.selectUser();
	}
	getUserInitials(name: string): string {
		if (!name) return '';
		const names = name.split(' ');
		const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
		return initials;
	}
}
