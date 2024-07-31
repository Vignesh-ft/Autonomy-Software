import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupOptionsComponent } from './setup-options.component';

describe('SetupOptionsComponent', () => {
  let component: SetupOptionsComponent;
  let fixture: ComponentFixture<SetupOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
