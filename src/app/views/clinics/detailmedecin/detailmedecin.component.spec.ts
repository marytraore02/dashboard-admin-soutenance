import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmedecinComponent } from './detailmedecin.component';

describe('DetailmedecinComponent', () => {
  let component: DetailmedecinComponent;
  let fixture: ComponentFixture<DetailmedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailmedecinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailmedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
