import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringOptionsComponent } from './monitoring-options.component';

describe('MonitoringOptionsComponent', () => {
  let component: MonitoringOptionsComponent;
  let fixture: ComponentFixture<MonitoringOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitoringOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
