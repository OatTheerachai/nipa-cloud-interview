import { useContext } from 'react';
import { TicketContext } from '@/contexts/TicketContext';


// Custom hook to consume the TicketContext
export const useTicket = () => {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error('useTicket must be used within a TicketProvider');
  }
  
  return context;
};