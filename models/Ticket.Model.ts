import mongoose, { Schema, Document } from 'mongoose';

export interface ContactInformation {
  name: string;
  email: string;
  phone: string;
}

export interface Ticket extends Document {
  title: string;
  description: string;
  contactInformation: ContactInformation;
  createdTimestamp: Date;
  latestUpdateTimestamp: Date;
  status: 'pending' | 'accepted' | 'resolved' | 'rejected';
}

const ticketSchema = new Schema<Ticket>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  contactInformation: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  createdTimestamp: { type: Date, default: Date.now },
  latestUpdateTimestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'resolved', 'rejected'],
    default: 'pending'
  }
});

const TicketModel = mongoose.models.Ticket || mongoose.model<Ticket>('Ticket', ticketSchema);

export default TicketModel;
