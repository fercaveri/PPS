import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuentoComponent } from './recuento.component';

describe('RecuentoComponent', () => {
  let component: RecuentoComponent;
  let fixture: ComponentFixture<RecuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
