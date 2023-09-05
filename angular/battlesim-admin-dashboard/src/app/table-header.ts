import { TableHeaderInput } from "./table-header-input";

export interface TableHeader {
    id: string;
    fieldName?: string;
    displayText?: string;
    width?: string;
    input?: TableHeaderInput;
}
