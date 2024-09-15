import { NextRequest, NextResponse } from 'next/server';
import Ticket from '@/models/Ticket.Model';
import { connectToDatabase } from '@/libs/mongoose';

// update ticket by ID
export async function PUT(request: NextRequest) {
    try {
        await connectToDatabase();

        const data = await request.json();
        const { id, title, description, contactInformation, status } = data;

        // Validate the input data
        if (!id || !status) {
            return NextResponse.json({ message: 'ID and status are required' }, { status: 400 });
        }

        // Find ticket by ID and update its fields
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id, 
            {
                title,
                description,
                contactInformation,
                status,
                latestUpdateTimestamp: new Date(), // Update timestamp
            }, 
            { new: true }
        );

        if (!updatedTicket) {
            return NextResponse.json({ message: 'Ticket not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Ticket updated successfully', ticket: updatedTicket }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating ticket:', error); // Log the error for debugging
        return NextResponse.json({ message: 'Error updating ticket', error: error.message }, { status: 500 });
    }
}

