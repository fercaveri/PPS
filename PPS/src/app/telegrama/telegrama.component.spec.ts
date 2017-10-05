import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramaComponent } from './telegrama.component';

describe('TelegramaComponent', () => {
  let component: TelegramaComponent;
  let fixture: ComponentFixture<TelegramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
