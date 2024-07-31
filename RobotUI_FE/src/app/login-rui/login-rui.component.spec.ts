import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRuiComponent } from './login-rui.component';

describe('LoginRuiComponent', () => {
  let component: LoginRuiComponent;
  let fixture: ComponentFixture<LoginRuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginRuiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
