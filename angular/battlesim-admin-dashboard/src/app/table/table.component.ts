import { Component, Input } from '@angular/core';
import { TableHeader } from '../table-header';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() headers!: TableHeader[];
  @Input() items!: any[];
  private headerStyles: {
    [key: TableHeader['id']]: Partial<CSSStyleDeclaration>
  } = {}

  getHeaderStyle(header: TableHeader): Partial<CSSStyleDeclaration> {
    if (this.headerStyles[header.id] === undefined)
      this.headerStyles[header.id] = {
        'width': header.width !== undefined ? header.width : 'auto'
      }
    return this.headerStyles[header.id]
  }
}
