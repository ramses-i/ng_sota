import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedMainComponent } from './feed-main.component';

describe('FeedMainComponent', () => {
  let component: FeedMainComponent;
  let fixture: ComponentFixture<FeedMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
