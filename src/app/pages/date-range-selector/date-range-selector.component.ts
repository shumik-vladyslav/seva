import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-date-range-selector',
  templateUrl: './date-range-selector.component.html',
  styleUrls: ['./date-range-selector.component.scss']
})
export class DateRangeSelectorComponent {
  events: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: true,
    firstDay: 1,
    buttonText: {
      today: 'Сегодня',
      next: 'Сл. месяц',
      prev: 'Пр. месяц',
    },
    events: [],
    dateClick: function (info) {
      console.log("See day infos: ", info);
    },
    locales: [{ code: 'ru' }]
  };

  event = {
    start: new Date(),
    end: new Date(),
    title: ''
  };

  colours = [
    'red',
    'blue',
    'green',
    'orange',
    'violet',
    'gray',
    'brown',
    'darkcyan',
    'darkmagenta',
    'fuchsia'
  ];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  deleteEvent(eventId: string) {
    this.firebaseService.deleteEvent(eventId);
  }

  addEvent() {
    const formattedStartDate = this.formatDate(this.event.start);
    const formattedEndDate = this.formatDate(this.event.end);
    const newEvent = {
      start: formattedStartDate,
      end: formattedEndDate,
      title: this.event.title,
    };
    this.firebaseService.addEvent(newEvent).then((e) => {
      console.log(e);
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  loadEvents() {
    this.firebaseService.getEvents().subscribe(events => {
      this.events = events.map((event, i) => ({
        title: event.title,
        start: event.start,
        end: event.end,
        backgroundColor: this.colours[i] ? this.colours[i] : this.colours[i - this.colours.length],
        docId: event.docId
      }));
    });
  }
}

