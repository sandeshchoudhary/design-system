import * as React from 'react';
import { text } from '@storybook/addon-knobs';
import Radio, { Size } from '../index';

// CSF format story
export const size = () => {

  const sizes: Size[] = ['tiny', 'regular'];

  const label = text(
    'label',
    'Radio'
  );

  const name = 'gender';

  const style = {
    display: 'flex',
  };

  return (
    <div style={style}>
      {
        sizes.map((RadioSize, ind) => {
          return (
            <div key={ind} style={{ marginRight: '5%' }}>
              <Radio
                size={RadioSize}
                label={RadioSize.charAt(0).toUpperCase() + RadioSize.slice(1)}
                name={name}
                value={label}
              />
            </div>
          );
        })
      }
    </div>
  );
};

// Required for CSF format story
// https://medium.com/storybookjs/component-story-format-66f4c32366df
export default { title: 'Radio' };
