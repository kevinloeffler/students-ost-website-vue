export type StudentsEvent = {
    eventId?: number,
    eventOrganiser: number,
    creationDate: Date,
    status: Status,
    title: string,
    date: Date,
    entryPrice?: number,
    email?: string,
    phone?: string,
    studentsOnly: boolean,
    description: string,
    startTime: string,
    endTime: string,
}

export type Organisation = {
    orgId: number,
    orgType: OrgType,
    name: string,
    description: string,
}

export type ProfileButton = {
    buttonId: number,
    organisation: number,
    label: string,
    link: string,
}

export enum OrgType {
    'Verein',
    'Fachschaft',
}

export enum Status {
    'active' = 'active',
    'draft' = 'draft',
    'deleted' = 'deleted',
}
