import * as React from 'react';
import { RangePicker } from '@/components/atoms/calendar';
import { View } from '@/components/atoms/calendar/types';
import Card from '@/components/atoms/card';

// CSF format story
export const view = () => {
  const values: View[] = ['year', 'month', 'date'];

  const style = {
    display: 'flex',
  };

  return (
    <div style={style}>
      {values.map((v, index) => (
        <Card
          key={index}
          shadow="light"
          style={{
            marginRight: '50px',
            maxWidth: '330px',
            alignSelf: 'flex-start'
          }}
        >
          <RangePicker
            startDate={new Date(2020, 2, 3)}
            endDate={new Date(2020, 2, 11)}
            view={v}
          />
        </Card>
      ))}
    </div>
  );
};

// Required for CSF format story
// https://medium.com/storybookjs/component-story-format-66f4c32366df
export default { title: 'Calendar/Rangepicker' };
