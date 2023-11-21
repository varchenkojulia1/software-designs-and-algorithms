export enum Marks {
    FRAGILE = 'fragile', ADDRESS = 'address', RETURN_RECEIPT = 'returnReseipt'
}

export interface ShipmentMarks {
    displayValue: string, value: Marks
}

export const marksValues: ShipmentMarks[] = [
    { displayValue: 'MARK FRAGILE', value: Marks.FRAGILE },
    { displayValue: 'MARK DO NOT LEAVE IF ADDRESS NOT AT HOME', value: Marks.ADDRESS },
    { displayValue: 'MARK RETURN RECEIPT REQUESTED', value: Marks.RETURN_RECEIPT }
]
