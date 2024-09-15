import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import { TicketBody } from '@/types/kanban.type';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TicketBody) => Promise<void>;
  initValues: any
}

const Modal: React.FC<ModalProps> = ({ open, onClose, onSubmit, initValues }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<TicketBody>({
    defaultValues: {
      title: '',
      description: '',
      contact: {
        name: '',
        email: '',
        phone: ''
      }
    }
  });

  useEffect(() => {
    // set defaultValues
    if(initValues) reset({...initValues, contact: { name: initValues.contactInformation.name , email: initValues.contactInformation.email, phone: initValues.contactInformation.phone }});
    else reset({ title: '', description: '', contact: { name: '', email: '', phone: '' }}); // reset form
  },[open,initValues])

  const onSubmitHandler: SubmitHandler<TicketBody> = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography sx={{ fontWeight: 'bold' }}>Create New Ticket</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                size='small'
                label="Title"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                size='small'
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Contact Information</Typography>
          <Controller
            name="contact.name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                size='small'
                margin="normal"
                error={!!errors.contact?.name}
                helperText={errors.contact?.name?.message}
              />
            )}
          />
          <Controller
            name="contact.email"
            control={control}
            rules={{ required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                size='small'
                margin="normal"
                error={!!errors.contact?.email}
                helperText={errors.contact?.email?.message}
              />
            )}
          />
          <Controller
            name="contact.phone"
            control={control}
            rules={{ 
              required: 'Phone number is required',
              pattern: { 
                value: /^0\d{9}$/, 
                message: 'Phone number must be exactly 10 digits and start with 0' 
              } 
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                fullWidth
                size='small'
                margin="normal"
                error={!!errors.contact?.phone}
                helperText={errors.contact?.phone?.message}
              />
            )}
          />
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' size='small' onClick={onClose} color="error">
              Cancel
            </Button>
            <Button type="submit" variant='contained' size='small' color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
