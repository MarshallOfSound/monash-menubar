import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';

import BigCalendar from 'react-big-calendar';

import EventWrapper from './EventWrapper';

BigCalendar.momentLocalizer(moment);

const dayMap = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};

const components = {
  eventWrapper: EventWrapper,
};

export default class Calendar extends PureComponent {
  constructor(...args) {
    super(...args);

    this._events = this._events.bind(this);
  }

  _events() {
    const { allocateData: { student: { allocated } } } = this.props;

    const events = [];

    Object.keys(allocated).forEach((key) => {
      const event = allocated[key];

      const start = moment(new Date(
        parseInt(event.start_date.split('/')[2], 10),
        parseInt(event.start_date.split('/')[1], 10) - 1,
        parseInt(event.start_date.split('/')[0], 10),
        parseInt(event.start_time.split(':')[0], 10),
        parseInt(event.start_time.split(':')[1], 10),
      )).add(dayMap[event.day_of_week], 'days');

      event.week_pattern.split('').forEach((bin, index) => {
        if (bin === '0') return;
        const newStart = moment(start).add(index, 'weeks');

        const newEvent = {
          id: key,
          title: `${event.subject_code.split('_')[0]} - ${event.activityType}`,
          startDate: newStart.toDate(),
          endDate: moment(newStart).add(event.duration, 'minutes').toDate(),
          _raw: event,
        };
        events.push(newEvent);
      });
    });

    return events;
  }

  render() {
    return (
      <BigCalendar
        events={this._events()}
        startAccessor="startDate"
        endAccessor="endDate"
        min={new Date(0, 0, 0, 8)}
        max={new Date(0, 0, 0, 21)}
        scrollToTime={new Date()}
        date={new Date()}
        view="week"
        toolbar={false}
        components={components}
        selectable={false}
      />
    );
  }
}

Calendar.propTypes = {
  allocateData: PropTypes.shape({
    student: PropTypes.shape({
      allocated: PropTypes.array,
    }),
  }).isRequired,
};
