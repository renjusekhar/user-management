import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../../types/user.model';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  const mockUser: User = {
    bio: 'description',
    id: 'abcd',
    language: 'english',
    name: 'john doe',
    version: 1.6,
  };

  const mockUsers: User[] = [
    mockUser,
    {
      bio: 'description 2',
      id: 'efgh',
      language: 'spanish',
      name: 'jane doe',
      version: 1.6,
    }
  ];

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['getUsers']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [BrowserModule, BrowserAnimationsModule, UserListComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    userService.getUsers.and.returnValue(of(mockUsers));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to user details', () => {
    component.navigateToUserDetails(mockUser);
    expect(router.navigate).toHaveBeenCalledWith(['/user', mockUser.id]);
  });

});
