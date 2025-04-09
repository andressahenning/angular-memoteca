import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensamentoComponent } from './pensamento.component';

describe('PensamentoComponent', () => {
  let component: PensamentoComponent;
  let fixture: ComponentFixture<PensamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PensamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PensamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
