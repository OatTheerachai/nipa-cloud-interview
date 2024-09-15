import React from "react";
import { Card, Typography, Box, IconButton, Divider } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "@/types/kanban.type";
import { useTicket } from "@/hooks/useTicket";
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';

interface TaskCardProps {
    task: Task;
    index: number;
    openModal: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, openModal }) => {
    const { setSelectedTask } = useTicket();

    const handleEditClick = () => {
        setSelectedTask(task);
        openModal();
    };

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                        width: '100%',
                        p: 2,
                        mb: 2,
                        cursor: snapshot.isDragging ? 'grabbing' : 'pointer',
                        boxShadow: snapshot.isDragging ? 4 : 2,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                        border: `1px solid ${snapshot.isDragging ? 'primary.main' : 'transparent'}`,
                        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                        position: 'relative', // For positioning the edit button
                    }}
                    aria-label={`Task ${task.title || 'Untitled'}`}
                >
                    <IconButton
                        onClick={handleEditClick}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 1, // Ensure the button is on top
                            color: 'text.secondary',
                        }}
                        aria-label="Edit task"
                    >
                        <EditIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {task.title || 'Untitled'}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                        {task.description || 'No description available'}
                    </Typography>

                    {task.contactInformation && (
                        <Box sx={{ mt: 2 }}>
                            <Divider sx={{ mb: 1 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                Contact Information
                            </Typography>
                            <Box sx={{ ml: 1 }}>
                                <br />
                                <Typography variant="caption" color="text.secondary">
                                    Name: {task.contactInformation.name || 'N/A'}
                                </Typography>
                                <br />
                                <Typography variant="caption" color="text.secondary">
                                    Email: {task.contactInformation.email || 'N/A'}
                                </Typography>
                                <br />
                                <Typography variant="caption" color="text.secondary">
                                    Phone: {task.contactInformation.phone || 'N/A'}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <Divider sx={{ mb: 1 }} />
                        <Typography variant="caption" color="text.secondary">
                            Created: {task.createdTimestamp ? moment(task.createdTimestamp).format('MMM D, YYYY') : '-'}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary">
                            Updated: {task.latestUpdateTimestamp ? moment(task.latestUpdateTimestamp).format('MMM D, YYYY') : '-'}
                        </Typography>
                    </Box>
                </Card>
            )}
        </Draggable>
    );
};

export default TaskCard;
