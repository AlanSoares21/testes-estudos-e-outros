import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TableHeader } from '../table-header';

interface SampleData {
  value1: string;
  value2: number;
  value3: boolean;
}

const data: SampleData[] = [
  { value1: 'value01', value2: 123, value3: false },
  { value1: 'value0102', value2: 456, value3: true },
  { value1: 'value0103', value2: 789, value3: false }
]

const headers: TableHeader[] = [
  {
    id: 'v1',
    fieldName: 'value1',
    displayText: 'First value'
  },
  {
    id: 'v2',
    fieldName: 'value2',
    displayText: 'Second value',
    width: '20%'
  },
  {
    id: 'v3',
    fieldName: 'value3',
    displayText: 'Third value',
    width: '10%'
  }
]

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.headers = headers
    component.items = data
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create headers', () => {
    const thead = (fixture.nativeElement as HTMLElement).querySelector('thead')
    expect(thead).not.toBeNull()
    if (thead === null)
      return;

    for (let index = 0; index < headers.length; index++) {
      expect(thead.textContent).toContain(headers[index].displayText)
    }
  })

  it('should create one row for each data registry', () => {
    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('tr')
    expect(rows.length).toBeGreaterThan(0)
    rows.forEach((row, i) => {
        expect(row.textContent).toContain(data[i].value1)
        expect(row.textContent).toContain(data[i].value2)
        expect(row.textContent).toContain(`${data[i].value3}`)
    })
  })

  it('get styles correct for each header', () => {
    for (const header of headers) {
      const style = component.getHeaderStyle(header)
      if (header.width === undefined)
        expect(style['width']).toBe('auto')
      else
        expect(style['width']).toBe(header.width)
    }
  })
});
