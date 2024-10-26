import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserDetailsComponent } from './user-details.component';
import { User } from '../../types/user.model';


describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: { paramMap: BehaviorSubject<Map<string, string>> };

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
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteSpy = { paramMap: new BehaviorSubject(new Map<string, string>([['id', 'abcd']])) };

    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should load users and set selected user on init', () => {
  //   userServiceSpy.getUsers.and.returnValue(of(mockUsers));

  //   component.ngOnInit();

  //   expect(component.users).toEqual(mockUsers);
  //   expect(component.selectedUserId).toBe('abcd');
  //   expect(component.selectedUser).toEqual(mockUsers[0]);
  // });

  it('should go back to user list when goBack is called', () => {
    component.goBack();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should select the previous user correctly', () => {
    userServiceSpy.getUsers.and.returnValue(of(mockUsers));
    component.ngOnInit();
    component.selectPreviousUser();

    expect(component.selectedUserId).toBe('efgh');
    expect(component.selectedUser).toEqual(mockUsers[1]);
  });

  it('should wrap around to the last user when selecting previous from the first user', () => {
    userServiceSpy.getUsers.and.returnValue(of(mockUsers));
    component.ngOnInit();
    component.selectPreviousUser();
    component.selectPreviousUser();

    expect(component.selectedUserId).toBe('abcd'); 
    expect(component.selectedUser).toEqual(mockUsers[0]); 
  });

  it('should select the next user correctly', () => {
    userServiceSpy.getUsers.and.returnValue(of(mockUsers));
    component.ngOnInit();
    component.selectNextUser();

    expect(component.selectedUserId).toBe('efgh'); 
    expect(component.selectedUser).toEqual(mockUsers[1]); 
  });



  it('should return initials of the user\'s name', () => {
    const initials = component.getUserInitials('John Doe');
    expect(initials).toBe('JD'); 
  });

  it('should return empty string for empty name', () => {
    const initials = component.getUserInitials('');
    expect(initials).toBe('');
  });
});
