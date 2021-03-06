import * as React from 'react';
import Radio from '../index';

// CSF format story
export const state = () => {

  const style = {
    display: 'flex',
  };

  const name = 'state';

  return (
    <div style={style}>
      <div style={{ marginRight: '5%' }}>
        <Radio
          label={'Disabled'}
          name={name}
          value={'Disabled'}
          disabled={true}
        />
      </div>
      <div>
        <Radio
          label={'Enabled'}
          name={name}
          value={'Enabled'}
          disabled={false}
        />
      </div>
    </div>
  );
};

// Required for CSF format story
// https://medium.com/storybookjs/component-story-format-66f4c32366df
export default { title: 'Radio' };
