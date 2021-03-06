import * as React from 'react';
import Calendar from '@/components/atoms/calendar/Calendar';
import { View } from '@/components/atoms/calendar/types';
import Card from '@/components/atoms/card';
import Heading from '@/components/atoms/heading';

// CSF format story
export const disabled = () => {
  const view: View[] = ['year', 'month', 'date'];

  const style = {
    display: 'flex',
  };

  return (
    <>
      <Heading>disabledBefore</Heading>
      <div style={style}>
        {view.map((v, index) => (
          <Card
            key={index}
            shadow="light"
            style={{
              marginRight: '50px',
              maxWidth: '330px',
              alignSelf: 'flex-start'
            }}
          >
            <Calendar
              date={new Date(2020, 2, 15)}
              disabledBefore={new Date(2020, 2, 10)}
              view={v}
            />
          </Card>
        ))}
      </div>

      <Heading>disabledAfter</Heading>
      <div style={style}>
        {view.map((v, index) => (
          <Card
            key={index}
            shadow="light"
            style={{
              marginRight: '50px',
              maxWidth: '330px',
              alignSelf: 'flex-start'
            }}
          >
            <Calendar
              date={new Date(2020, 2, 15)}
              disabledAfter={new Date(2020, 2, 20)}
              view={v}
            />
          </Card>
        ))}
      </div>

      <Heading>disabledBefore and disabledAfter</Heading>
      <div style={style}>
        {view.map((v, index) => (
          <Card
            key={index}
            shadow="light"
            style={{
              marginRight: '50px',
              maxWidth: '330px',
              alignSelf: 'flex-start'
            }}
          >
            <Calendar
              date={new Date(2020, 2, 15)}
              disabledBefore={new Date(2020, 2, 10)}
              disabledAfter={new Date(2020, 2, 20)}
              view={v}
            />
          </Card>
        ))}
      </div>
    </>
  );
};

// Required for CSF format story
// https://medium.com/storybookjs/component-story-format-66f4c32366df
export default { title: 'Calendar' };
