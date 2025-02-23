import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutMainComponent } from './logout-main.component';

describe('LogoutMainComponent', () => {
  let component: LogoutMainComponent;
  let fixture: ComponentFixture<LogoutMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
