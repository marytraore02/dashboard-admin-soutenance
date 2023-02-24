import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSpecialiteComponent } from './modifier-specialite.component';

describe('ModifierSpecialiteComponent', () => {
  let component: ModifierSpecialiteComponent;
  let fixture: ComponentFixture<ModifierSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierSpecialiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
