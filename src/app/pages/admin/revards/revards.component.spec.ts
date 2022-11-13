import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevardsComponent } from './revards.component';

describe('RevardsComponent', () => {
  let component: RevardsComponent;
  let fixture: ComponentFixture<RevardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
