'use client';
import React, { useEffect } from 'react';
import Header from './Header';
import { Box, Button, Typography, Divider, TextField, Card, Grid } from '@mui/material';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import Container from './Container';
import { KanbanProps } from '@/types/kanban.type';
import { useTicket } from '@/hooks/useTicket';
import { useModal } from '@/hooks/useModal';
import TicketModal from "@/components/modals/TicketModal"
import { TicketBody } from '@/types/kanban.type';
import { updateTicket } from '@/services/ticketApi';

const Kanban: React.FC<KanbanProps> = () => {
  
  const { data, onUpdateTask, createTask, onSetTickets, selectedTask, setSelectedTask } = useTicket();

  useEffect(() => {
    onSetTickets();
  },[])

  const { isOpen, openModal, closeModal } = useModal();
  
  const onDragEnd = async ({ source, destination }: any) => {
    if (!destination) return;
  
    const sourceColIndex = data.findIndex((e) => e._id === source.droppableId);
    const destinationColIndex = data.findIndex((e) => e._id === destination.droppableId);
  
    if (sourceColIndex === -1 || destinationColIndex === -1) return;
  
    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];
  
    let movedTask;
  
    if (source.droppableId !== destination.droppableId) {
      // move task between different sections
      const [removed] = sourceCol.tasks.splice(source.index, 1);
      destinationCol.tasks.splice(destination.index, 0, removed);
      movedTask = { ...removed, section: { id: destination.droppableId } };
    } else {
      // move task within the same section
      const [removed] = sourceCol.tasks.splice(source.index, 1);
      sourceCol.tasks.splice(destination.index, 0, removed);
      movedTask = { ...removed, section: { id: source.droppableId } };
    }
  
    // update the new task position
    try {
      await updateTicket(movedTask._id, {
        title: movedTask.title,
        description: movedTask.description,
        contactInformation: movedTask.contactInformation,
        status: movedTask.section.id,
      });
      onUpdateTask(movedTask); // update the context
    } catch (error) {
      console.error('Error updating ticket position:', error);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if(selectedTask) {
        const response = await updateTicket(data._id, {
          title: data.title,
          description: data.description,
          contactInformation: { ...data.contact },
          status: data.section.id,
        });
        const { ticket } = response;
        const updateValues = { ...ticket, section: { id: ticket.status } };
        onUpdateTask(updateValues);
      } else {
        await createTask(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const hanldeCloseModal = () => {
    setSelectedTask(undefined);
    closeModal();
  }

  console.log("selectedTask: ",selectedTask);
  

  return (
    <Grid container sx={{ py: 10, px: 30 }}>
      <Grid item xs={12}>
        <Header title="Interview Assignment" openModal={openModal} />
        <Divider sx={{ margin: '20px 0' }} />
      </Grid>
      <Grid item xs={12}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={1}>
            {data.map((section) => (
              <Container key={section._id} section={section} openModal={openModal} />
            ))}
          </Grid>
        </DragDropContext>
      </Grid>
      <TicketModal open={isOpen} onClose={hanldeCloseModal} onSubmit={onSubmit} initValues={selectedTask} />
    </Grid>
  );
};

export default Kanban;
