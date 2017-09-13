import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoDetailsComponent } from './partido-details.component';

describe('PartidoDetailsComponent', () => {
  let component: PartidoDetailsComponent;
  let fixture: ComponentFixture<PartidoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
