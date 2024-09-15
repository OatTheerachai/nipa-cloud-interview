export interface Task {
    _id: string;
    title: string;
    description: string;
    contactInformation: { name: string; email: string; phone: string; };
    createdTimestamp: Date;
    latestUpdateTimestamp: Date;
    section: {
      id: string;
    };
  }
  
  export interface Section {
    _id: string;
    name: string;
    tasks: Task[];
  }
  

export interface ContainerProps {
    section: Section[];
}

export interface KanbanProps {
    boardId: string;
    data: Section[];
}

export interface TicketBody {
  id: string;
  title: string;
  description: string;
  contact: { name: string; email: string; phone: string; };
}

export interface CreatedTicket {
  _id: string;
  title: string;
  description: string;
  contactInformation: { name: string; email: string; phone: string; };
  createdTimestamp: Date;
  latestUpdateTimestamp: Date;
  status: 'pending' | 'accepted' | 'resolved' | 'rejected';
}


