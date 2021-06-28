import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalModeComponent } from './normal-mode.component';

describe('NormalModeComponent', () => {
  let component: NormalModeComponent;
  let fixture: ComponentFixture<NormalModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
