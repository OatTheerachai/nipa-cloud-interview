import { NextRequest, NextResponse } from 'next/server';
import Ticket from '@/models/Ticket.Model';
import { connectToDatabase } from '@/libs/mongoose';

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase(); // Make sure to await connection

        const data = await request.json();
        const { title, description, contactInformation } = data;

        const newTicket = new Ticket({
            title,
            description,
            contactInformation,
            createdTimestamp: new Date(),
            latestUpdateTimestamp: new Date(),
        });

        await newTicket.save();

        return NextResponse.json({ message: 'Ticket created successfully', ticket: newTicket }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating ticket', error }, { status: 500 });
    }
}

// Fetch all tickets, sorted by latest update
export async function GET() {
    try {
        await connectToDatabase(); // Make sure to await connection

        const tickets = await Ticket.find().sort({ latestUpdateTimestamp: -1 });
        return NextResponse.json(tickets, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching tickets', error }, { status: 500 });
    }
}
