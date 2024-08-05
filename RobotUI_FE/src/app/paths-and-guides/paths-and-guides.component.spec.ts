import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathsAndGuidesComponent } from './paths-and-guides.component';

describe('PathsAndGuidesComponent', () => {
  let component: PathsAndGuidesComponent;
  let fixture: ComponentFixture<PathsAndGuidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathsAndGuidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathsAndGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
