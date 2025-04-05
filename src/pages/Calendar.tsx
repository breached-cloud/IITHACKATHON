
import React, { useState } from "react";
import PageLayout from "@/components/Layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Calendar as CalendarIcon, Plus, User, Users, School, Book, Tag } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
  type: string;
  createdBy: string;
  createdFor?: string;
}

const eventTypes = [
  { value: "assignment", label: "Assignment", color: "bg-blue-500" },
  { value: "exam", label: "Exam", color: "bg-red-500" },
  { value: "class", label: "Class", color: "bg-green-500" },
  { value: "meeting", label: "Meeting", color: "bg-purple-500" },
  { value: "holiday", label: "Holiday", color: "bg-yellow-500" },
  { value: "other", label: "Other", color: "bg-gray-500" }
];

const Calendar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Database Systems Assignment Due",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      description: "Submit your ER diagram and normalization examples",
      type: "assignment",
      createdBy: "Jane Faculty",
      createdFor: "CS101"
    },
    {
      id: "2",
      title: "Web Development Quiz",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      description: "Online quiz covering HTML, CSS and JavaScript basics",
      type: "exam",
      createdBy: "Jane Faculty",
      createdFor: "CS201"
    },
    {
      id: "3",
      title: "Semester Break",
      date: new Date(new Date().setDate(new Date().getDate() + 15)),
      description: "Winter break begins",
      type: "holiday",
      createdBy: "Admin User",
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: new Date(),
    description: "",
    type: "assignment",
    createdBy: user?.name || "",
  });
  
  // Get events for selected date
  const selectedDateEvents = events.filter(
    event => date && 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );
  
  // Helper function to get event type display properties
  const getEventTypeProps = (type: string) => {
    const eventType = eventTypes.find(et => et.value === type) || eventTypes[5]; // Default to "other"
    return {
      color: eventType.color,
      label: eventType.label
    };
  };
  
  // Function to handle adding new event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description || "",
      type: newEvent.type,
      createdBy: user?.name || "",
      createdFor: newEvent.createdFor
    };
    
    setEvents([...events, event]);
    setIsDialogOpen(false);
    setNewEvent({
      title: "",
      date: new Date(),
      description: "",
      type: "assignment",
      createdBy: user?.name || "",
    });
    
    toast({
      title: "Event Added",
      description: "Your event has been added to the calendar"
    });
  };
  
  // Function to handle date with events (used for calendar rendering)
  const isDayWithEvent = (day: Date) => {
    return events.some(
      event => 
        event.date.getDate() === day.getDate() && 
        event.date.getMonth() === day.getMonth() && 
        event.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <PageLayout title="Calendar" requiredRoles={["student", "faculty", "admin"]}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Calendar</span>
              {(user?.role === "faculty" || user?.role === "admin") && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex items-center gap-1">
                      <Plus size={16} />
                      <span>Add Event</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Event Title</Label>
                        <Input 
                          id="title" 
                          value={newEvent.title} 
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <CalendarComponent
                          mode="single"
                          selected={newEvent.date}
                          onSelect={(date) => setNewEvent({...newEvent, date: date || new Date()})}
                          className="border rounded-md p-3"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Event Type</Label>
                        <Select 
                          value={newEvent.type} 
                          onValueChange={(value) => setNewEvent({...newEvent, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center">
                                  <div className={`w-3 h-3 rounded-full ${type.color} mr-2`} />
                                  {type.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {user?.role === "faculty" && (
                        <div className="space-y-2">
                          <Label htmlFor="createdFor">For Course/Class</Label>
                          <Input 
                            id="createdFor" 
                            value={newEvent.createdFor || ''} 
                            onChange={(e) => setNewEvent({...newEvent, createdFor: e.target.value})}
                            placeholder="e.g. CS101, All Students"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          value={newEvent.description || ''} 
                          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddEvent}>Add Event</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                event: (date) => isDayWithEvent(date)
              }}
              modifiersClassNames={{
                event: "bg-blue-100 text-blue-900 font-bold"
              }}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <div key={type.value} className="flex items-center text-xs">
                  <div className={`w-3 h-3 rounded-full ${type.color} mr-1`} />
                  <span>{type.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? (
                <div className="flex items-center">
                  <CalendarIcon size={20} className="mr-2" />
                  <span>Events for {date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              ) : (
                "Select a date to view events"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => {
                  const eventTypeProps = getEventTypeProps(event.type);
                  return (
                    <div 
                      key={event.id} 
                      className={`p-4 rounded-lg border border-l-4 ${eventTypeProps.color.replace('bg-', 'border-l-')}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <div className={`px-2 py-0.5 rounded-full text-xs text-white ${eventTypeProps.color}`}>
                              {eventTypeProps.label}
                            </div>
                            {event.createdFor && (
                              <div className="flex items-center gap-1">
                                <Book size={14} />
                                <span>{event.createdFor}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>By: {event.createdBy}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.date.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      {event.description && (
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{event.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon size={48} className="mx-auto mb-3 opacity-20" />
                <p>No events scheduled for this date</p>
                {(user?.role === "faculty" || user?.role === "admin") && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Event
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Calendar;
