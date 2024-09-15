'use client';
import React, { createContext, useState, ReactNode } from 'react';
import { Task, Section, TicketBody } from '@/types/kanban.type';
import { createTicket, getAllTicket } from "@/services/ticketApi"

// declare type context
interface TicketContextType {
  data: Section[];
  selectedTask: Task | undefined;
  createTask: (body: TicketBody) => Promise<void>;
  onUpdateTask: (task: Task) => void;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  onSetTickets: () => Promise<void>;
}


// create context
const TicketContext = createContext<TicketContextType | undefined>(undefined);

// ประกาศ Provider
const TicketProvider: React.FC<{ children: ReactNode }> = ({  children }) => {
  const [ticketData, setTicketData] = useState<Section[]>([
    {
      _id: "pending",
      name: "Pending",
      tasks: []
    },
    {
      _id: "accepted",
      name: "Accepted",
      tasks: []
    },
    {
      _id: "resolved",
      name: "Resolved",
      tasks: []
    },
    {
      _id: "rejected",
      name: "Rejected",
      tasks: []
    }
  ]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  
  // get all tickets
  const onSetTickets = async () => {
    try {
      // fetch tickets from the API
      const tickets: Task[] = await getAllTicket();

      // create a map to hold the sections by their IDs
      const sectionsMap = new Map<string, Section>(
        ticketData.map((section) => [section._id, section])
      );

      // Add tickets to sections
      tickets.forEach((ticket: any) => {
        const sectionId = ticket.status; 
        const section = sectionsMap.get(sectionId);

        if (section) {

          const newTask: Task = {
            ...ticket,
            section: { id: sectionId },
          };

          // update the section with the new task
          section.tasks.push(newTask);
        }
      });

      setTicketData(Array.from(sectionsMap.values()));
    } catch (error: any) {
      console.error('Error fetching and setting tickets:', error.message);
    }
  };

  const createTask = async (body: TicketBody) => {

    try {

      const createdTask: any = await createTicket(body);

      const { ticket } = createdTask;

      const newTask: Task = {
        ...ticket,
        section: { id: ticket.status },
      };

      // update the frontend state once the task is created successfully in the backend
      setTicketData((prev) => {
        const sectionIndex = prev.findIndex((e) => e._id === newTask.section.id);
        const updatedTasks = [...prev[sectionIndex].tasks, newTask];
        const updatedSection = { ...prev[sectionIndex], tasks: updatedTasks };
        return [...prev.slice(0, sectionIndex), updatedSection, ...prev.slice(sectionIndex + 1)];
      });
    } catch (error: any) {
      console.error('Error creating task:', error.message);
    }
  };

  const onUpdateTask = (task: Task) => {
    try {
      setTicketData((prev) => {
        const sectionIndex = prev.findIndex((e) => e._id === task.section.id);
        const updatedTasks = prev[sectionIndex].tasks.map((t) => (t._id === task._id ? task : t));
        const updatedSection = { ...prev[sectionIndex], tasks: updatedTasks };
        return [...prev.slice(0, sectionIndex), updatedSection, ...prev.slice(sectionIndex + 1)];
      });
    } catch (error: any) {
      console.error('Error creating task:', error.message);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        data: ticketData,
        selectedTask,
        createTask,
        onUpdateTask,
        setSelectedTask,
        onSetTickets
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export { TicketProvider, TicketContext };
