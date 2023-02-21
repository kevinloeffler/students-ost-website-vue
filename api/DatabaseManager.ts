import dotenv from 'dotenv'
import * as pg from 'pg'
import {Organisation, OrgType, StudentsEvent} from '../@types/Types.js'

dotenv.config()
// @ts-ignore
const { Pool } = pg.default

class DatabaseManager {

    pool: typeof Pool

    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            // @ts-ignore
            port: process.env.DB_PORT,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        })

        this.pool.connect()
    }

    private async dbQuery(query: string, values: any[] = []): Promise<[any] | null> {
        try {
            const response = await this.pool.query(query, values)
            return response.rows
        } catch (err) {
            console.log(err)
            return null
        }
    }

    // EVENTS

    async getNextEvents(numberOfEvents: number = 3) : Promise<StudentsEvent[] | null> {
        const query = `SELECT * FROM events
            WHERE date > now()
            AND status = 'active'
            ORDER BY date ASC
            LIMIT $1;`

        const response = await this.dbQuery(query, [numberOfEvents])
        if (response == null) return null

        const eventArray: StudentsEvent[] = []

        for (const e of response) {
            const newEvent: StudentsEvent = convertToStudentsEvent(e)
            eventArray.push(newEvent)
        }

        return eventArray
    }

    async getEvent(eventId: number): Promise<StudentsEvent | null> {
        const query = 'SELECT * FROM events WHERE event_id = $1'
        const response = await this.dbQuery(query, [eventId])
        if (response == null) return null
        return convertToStudentsEvent(response[0])
    }

    async createEvent(e: StudentsEvent): Promise<number | null> {
        const query = `INSERT INTO events
                       (event_organiser, creation_date, status, title, date,
                       entry_price, email, phone, students_only, description,
                       start_time, end_time)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                       RETURNING event_id;`
        const values = [
            e.eventOrganiser, e.creationDate, e.status, e.title, e.date, e.entryPrice,
            e.email, e.phone, e.studentsOnly, e.description, e.startTime, e.endTime
        ]
        const response = await this.dbQuery(query, values)
        if (response == null) return null
        return response[0].event_id
    }

    // ORGANIZATIONS

    async getOrganisation(orgId: number): Promise<Organisation | null> {
        const query = 'SELECT * FROM organisations WHERE org_id = $1'
        const values = [orgId]

        const response = await this.dbQuery(query, [orgId])
        if (response == null) return null
        return convertToOrganization(response[0])
    }
}

function convertToStudentsEvent(rawEvent: any): StudentsEvent {
    return {
        eventId: rawEvent.event_id,
        eventOrganiser: rawEvent.event_organiser,
        creationDate: rawEvent.creation_date,
        status: rawEvent.status,
        title: rawEvent.title.trim(),
        date: rawEvent.date,
        entryPrice: rawEvent.entry_price,
        email: rawEvent.email,
        phone: rawEvent.phone?.trim() ?? null,
        studentsOnly: rawEvent.students_only,
        description: rawEvent.description,
        startTime: rawEvent.start_time,
        endTime: rawEvent.end_time,
    }
}

function convertToOrganization(rawOrg: any): Organisation {
    return {
        orgId: rawOrg.org_id,
        orgType: rawOrg.org_type,
        name: rawOrg.name,
        description: rawOrg.description,
    }
}

export const databaseManager = new DatabaseManager()
