import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePresentationComponent } from './profile-presentation.component';

describe('ProfilePresentationComponent', () => {
  let component: ProfilePresentationComponent;
  let fixture: ComponentFixture<ProfilePresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePresentationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
