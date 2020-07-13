import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatesTableComponent } from './plates-table.component';

describe('PlatesTableComponent', () => {
  let component: PlatesTableComponent;
  let fixture: ComponentFixture<PlatesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
