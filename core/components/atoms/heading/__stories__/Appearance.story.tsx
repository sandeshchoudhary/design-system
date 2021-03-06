import * as React from 'react';
import Heading, { Appearance } from '../index';
import Text from '@/components/atoms/text';

// CSF format story
export const appearance = () => {

  const appearances: Appearance[] = ['default', 'subtle', 'disabled', 'white'];

  const style = {
    display: 'flex',
    'flex-direction': 'row',
  };

  const outerStyle = {
    marginRight: '4%',
  };

  return (
    <div style={style}>
      {
        appearances.map((appear, ind) => {
          return (
            <div key={ind} style={outerStyle}>
              <div style={{ background: appear === 'white' ? 'black' : 'transparent' }}>
                <Heading appearance={appear}>
                  Heading
                </Heading>
              </div>
              <br />
              <Text weight="strong">{appear.charAt(0).toUpperCase() + appear.slice(1)}</Text>
            </div>
          );
        })
      }
    </div>
  );
};

// Required for CSF format story
// https://medium.com/storybookjs/component-story-format-66f4c32366df
export default { title: 'Typography/heading' };
