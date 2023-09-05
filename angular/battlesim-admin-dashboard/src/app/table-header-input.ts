export interface TableHeaderInput {
    type: 'checkbox';
    checked?: (data: any) => boolean;
    disabled?: (data: any) => boolean;
    change?: (data: any, index: number) => void;
}
