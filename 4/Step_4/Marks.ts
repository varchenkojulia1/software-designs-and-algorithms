export enum Marks {
    FRAGILE = 'fragile',
    ADDRESS = 'address',
    RETURN_RECEIPT = 'returnReseipt'
}

export const marksValues = {
    [Marks.FRAGILE]: 'MARK FRAGILE',
    [Marks.ADDRESS]: 'MARK DO NOT LEAVE IF ADDRESS NOT AT HOME',
    [Marks.RETURN_RECEIPT]: 'MARK RETURN RECEIPT REQUESTED'
}
