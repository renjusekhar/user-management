import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from '../../features/services/user.service';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;



  const mockUser = {
    bio: 'description',
    id: 'abcd',
    language: 'english',
    name: 'john doe',
    version: 1.6,
  }


  const mockUsers = [
    { ...mockUser, id: "abcd" },
    {
      bio: 'description',
      id: 'abcd',
      language: 'english',
      name: 'john doe',
      version: 1.6,
    }
  ];

  beforeEach(async () => {
    // Mock the UserService and Router
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init and set users and headers', () => {
    userServiceSpy.getUsers.and.returnValue(of(mockUsers));  // Mock API response

    component.ngOnInit();
    fixture.detectChanges(); // Trigger change detection

    expect(component.users()).toEqual(mockUsers);  // Verify users are set
    expect(component.headers()).toEqual(Object.keys(mockUsers[0]));  // Verify headers are set
  });

  it('should handle API error and set users to empty array', () => {
    userServiceSpy.getUsers.and.returnValue(throwError(() => new Error('API error'))); // Mock API error

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.users()).toEqual([]);  // Ensure users is empty after error
  });

  it('should navigate to user details when navigateToUserDetails is called', () => {
    const user = mockUsers[0];

    component.navigateToUserDetails(user);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/user', user.id]);
  });

  it('should not navigate if user is already being edited', () => {
    component.editListId = mockUsers[0].id;  // Set current editing user

    component.navigateToUserDetails(mockUsers[0]);
    expect(routerSpy.navigate).not.toHaveBeenCalled();  // No navigation when editing
  });

  it('should edit user and focus on the first editable cell', (done) => {
    spyOn(document, 'getElementById').and.returnValue({
      querySelectorAll: () => [{ focus: () => done() }]  // Mock cell focus
    } as any);

    component.editList(mockUsers[0].id);

    setTimeout(() => {
      expect(component.editListId).toBe(mockUsers[0].id);
      done();
    }, 0);
  });
});
