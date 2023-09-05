import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TableHeader } from '../table-header';
import { TableHeaderInput } from '../table-header-input';

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
    width: '20%',
    input: {
      type: 'checkbox'
    }
  },
  {
    id: 'v3',
    fieldName: 'value3',
    displayText: 'Third value',
    width: '10%'
  }
]

function createHeaderSpy(header: TableHeader): 
  null | jasmine.SpyObj<TableHeaderInput>
{
  if (header.input === undefined)
    return null
  const obj = jasmine.createSpyObj<TableHeaderInput>(`TableHeaderInput`, ['change', 'checked', 'disabled'])
  obj.type = 'checkbox'
  return obj
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const headersSpies = headers.map(createHeaderSpy)

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    // setting spies for headers
    for (let index = 0; index < headersSpies.length; index++) {
      if (headersSpies[index] === null || headers[index].input === undefined)
        continue
      headers[index].input = headersSpies[index] as TableHeaderInput
    }
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
    expect(rows.length).toEqual(data.length)

    rows.forEach(assertRowData)
  })
  
  function assertRowData(row: HTMLElement, rowIndex: number) {
      const rowData = data[rowIndex]

      for (let cellIndex = 0; cellIndex < row.children.length; cellIndex++) {
        const element = row.children.item(cellIndex)
        
        if (element === null) {
          fail(`The child ${cellIndex} of row ${rowIndex} is null`)
          break;
        }
        
        const header = headers[cellIndex]
        
        if (header.fieldName)
          expect(element.textContent)
          .withContext(`In the row ${rowIndex}, in the ${cellIndex} cell do not contains the expected value for header ${header.id}`)
          .toContain(rowData[header.fieldName as keyof SampleData])

        if (header.input)
          assertHeaderInput(header.input, cellIndex, row, rowIndex, `cell ${cellIndex} of row ${rowIndex}`)
      }
  }

  function assertHeaderInput(
      headerInput: TableHeaderInput,
      headerIndex: number,
      rowElement: HTMLElement, 
      rowIndex: number,
      messageToIdentityCell: string
    ) {
    const inputs = rowElement.getElementsByTagName('input')
    if (inputs.length === 0) {
      fail(`No input element found in ${messageToIdentityCell}`)
      return;
    }

    if (headerInput.type === 'checkbox') {
      // tem o elemento com o checkbox
      const checkbox = inputs[0]
      const elementType = checkbox.attributes.getNamedItem('type')
      if (elementType === null) {
        fail(`The input found in ${messageToIdentityCell} dont have a type attribute`)
        return;
      }
      expect(elementType.value)
      .withContext(`The input found in ${messageToIdentityCell} is not a checkbox`)
      .toBe('checkbox')
      
      const spy = headersSpies[headerIndex]
      if (spy === null) {
        fail(`The header spy is null. header index ${headerIndex}`)
        return;
      }

      if (headerInput.checked) {
        expect(spy.checked)
        .withContext(`The checked function has not been called in the input in ${messageToIdentityCell}`)
        .toHaveBeenCalled()
      }

      if (headerInput.disabled) {
        expect(spy.disabled)
        .withContext(`The disabled function has not been called in the input in ${messageToIdentityCell}`)
        .toHaveBeenCalled()
      }
  
      // when click in the checkbox call the function
      if (headerInput.change) {
        checkbox.click()
        expect(spy.change)
        .withContext(`The change function has not been called once in the input in ${messageToIdentityCell}`)
        .toHaveBeenCalledTimes(rowIndex + 1)
      }
    }
  }

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
