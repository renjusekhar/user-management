import { Injectable, signal, computed, inject } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../types/user.model';
import { firstValueFrom } from 'rxjs';

interface UserState {
  users: User[],
  headers: string[],
  initialUsers: User[]
}

const initialState: Readonly<UserState> = {
  users: [],
  headers: [],
  initialUsers: []
}


@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private readonly userService = inject(UserService)
  private readonly state = signal(initialState);
  readonly users = computed(() => this.state().users);
  readonly headers = computed(() => this.state().headers);
  readonly initialUsers = computed(() => this.state().initialUsers);
  
  private updateUsers(users: User[]) {
    this.state.update(state => ({
      ...state,
      users,
    }))

  };
  private updateHeaders(headers: string[]) {
    this.state.update(state => ({
      ...state,
      headers
    }))

  };

  private updateInitialUsers(initialUsers: User[]) {
    this.state.update(state => ({
      ...state,
      initialUsers
    }))

  };

  public async getAllUsers() {
    try {
      const response = await firstValueFrom(this.userService.getUsers());
      if (Array.isArray(response) && response.length > 0) {
        this.updateInitialUsers(response);
        this.updateUsers(response);
        this.updateHeaders(Object.keys(response[0]));
      } else {
        console.warn('Received response is not valid');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  public filterUsers(searchTerm: string) {
    const term = searchTerm.toLowerCase();
    if (!term) {
      this.updateUsers(this.initialUsers());
      return;
    }
    const filteredUsers = this.initialUsers().filter(user =>
      Object.values(user).some(key =>
        String(key).toLowerCase().includes(term)
      )
    );
    this.updateUsers(filteredUsers);
  }

  sortUsers(user: keyof User, ascending: boolean) {
    const sortedUseres= [...this.users()].sort((user1, user2) => {
      const currentUser = user1[user];
      const previousUser = user2[user];
      if (currentUser < previousUser) return ascending ? -1 : 1;
      if (currentUser > previousUser) return ascending ? 1 : -1;
      return 0;
    });
    this.updateUsers(sortedUseres);
  }
}

