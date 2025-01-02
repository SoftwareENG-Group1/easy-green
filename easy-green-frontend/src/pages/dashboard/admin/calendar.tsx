import { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parse } from "date-fns";
import { Modal, Box, Typography } from "@mui/material";


interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  status: string;
}

const AdminCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // State for selected event
  const [open, setOpen] = useState(false); // State for modal visibility

  const loanDueDates = [
    { client: "Munachim Arosabo", loanId: "L1234", paymentDate: "2024-12-11", status: "Active" },
    { client: "John Doe", loanId: "L5678", paymentDate: "2024-12-15", status: "Inactive" },
  ];

  const events: Event[] = loanDueDates.map((loan) => ({
    title: `Loan Payment Due: ${loan.client} (${loan.loanId})`,
    start: parse(loan.paymentDate, "yyyy-MM-dd", new Date()),
    end: parse(loan.paymentDate, "yyyy-MM-dd", new Date()),
    allDay: true,
    status: loan.status,
  }));

  // Open modal and set selected event
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="flex w-full h-full overflow-hidden bg-white">
      <Calendar
        localizer={momentLocalizer(moment)} // Pass moment instance here
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ width: "100%", height: "100vh" }}
        views={['month', 'week', 'day']} // Show month, week, and day views
        eventPropGetter={(event: Event) => ({
          style: {
            backgroundColor: event.status === "Inactive" ? "red" : "green",
            color: "white",
            fontWeight: "bold",
          },
        })}
        onSelectEvent={handleEventClick} // Handle event click
      />

      {/* Modal to display event details */}
      {selectedEvent && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              color:'black',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 550,
              maxWidth: "90%",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
            <strong>{selectedEvent.title}</strong> 
            </Typography>
            <Typography variant="body1">
              <strong>Date: </strong> {moment(selectedEvent.start).format("MMMM Do YYYY")}
            </Typography>
            <Typography variant="body1">
              <strong>Customer Status: </strong> {selectedEvent.status}
            </Typography>
           
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AdminCalendar;