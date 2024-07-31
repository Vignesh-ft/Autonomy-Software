import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionLogComponent } from './mission-log.component';

describe('MissionLogComponent', () => {
  let component: MissionLogComponent;
  let fixture: ComponentFixture<MissionLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MissionLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
