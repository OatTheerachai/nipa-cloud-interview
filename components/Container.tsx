'use client';
import React, { Fragment } from "react";
import { Box, Grid, Button } from "@mui/material";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTicket } from "@/hooks/useTicket";
import { Section, Task } from "@/types/kanban.type";
import SectionHeader from "@/components/SectionHeader";
import TaskCard from "@/components/TaskCard";

interface ContainerProps {
    section: Section;
    openModal: () => void
}

const Container: React.FC<ContainerProps> = ({ section, openModal }) => {
    // const { createTask } = useTicket();

    return (
        <Grid item lg={3} md={6} xs={12}>
            <Droppable droppableId={section._id}>
                {(provided) => (
                    <Fragment>                        
                        <SectionHeader status={section._id} name={section.name} />
                        <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            sx={{ p: 2, borderRadius: '8px', boxShadow: 2, bgcolor: '#e0f2f1', height: '400px',overflow: 'auto' }}
                        >
                            <Grid container spacing={1} sx={{ overflowY: 'auto' }}>
                                {section.tasks.map((task, index) => (
                                    <TaskCard key={task._id} task={task} index={index} openModal={openModal} />
                                ))}
                                {provided.placeholder}
                            </Grid>
                        </Box>
                    </Fragment>
                )}
            </Droppable>
        </Grid>
    );
}

export default Container;
