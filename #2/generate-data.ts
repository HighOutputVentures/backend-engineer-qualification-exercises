import { DateTime } from 'luxon';
import R from 'ramda';
import fs from 'fs';

const start = DateTime.fromISO('2020-03-01T00:00:00.000Z').setZone('UTC');

const outages = [
  {
    status: 'UNAVAILABLE',
    startDateTime: start.plus({ days: 5, hours: 6, minutes: 24 }),
    endDateTime: start.plus({ days: 5, hours: 6, minutes: 55 }),
  },
  {
    status: 'PARTIALLY_AVAILABLE',
    startDateTime: start.plus({ days: 5, hours: 6, minutes: 55 }),
    endDateTime: start.plus({ days: 5, hours: 7, minutes: 10 }),
  },
  {
    status: 'UNAVAILABLE',
    startDateTime: start.plus({ days: 20, hours: 3, minutes: 45 }),
    endDateTime: start.plus({ days: 20, hours: 5, minutes: 15 }),
  },
  {
    status: 'PARTIALLY_AVAILABLE',
    startDateTime: start.plus({ days: 20, hours: 5, minutes: 15 }),
    endDateTime: start.plus({ days: 20, hours: 5, minutes: 45 }),
  },
  {
    status: 'PARTIALLY_AVAILABLE',
    startDateTime: start.plus({ days: 25, hours: 16, minutes: 15 }),
    endDateTime: start.plus({ days: 25, hours: 16, minutes: 25 }),
  },
];

fs.writeFileSync(
  __dirname + '/data.json',
  JSON.stringify(
    R.unfold(({ current, end }) => {
      if (current >= end) {
        return false;
      }

      const outage = R.find((item) => current >= item.startDateTime && current < item.endDateTime, outages);

      return [
        {
          status: outage?.status || 'AVAILABLE',
          timestamp: current.toISO()
        },
        {
          current: current.plus({ minutes: 1 }),
          end,
        }
      ]
    }, { current: start, end: start.plus({ months: 1 }) }),
    null,
    '  ',
  ),
);
