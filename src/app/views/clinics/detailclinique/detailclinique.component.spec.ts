import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcliniqueComponent } from './detailclinique.component';

describe('DetailcliniqueComponent', () => {
  let component: DetailcliniqueComponent;
  let fixture: ComponentFixture<DetailcliniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailcliniqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailcliniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
