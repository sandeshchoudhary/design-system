import * as React from 'react';
import { text, select } from '@storybook/addon-knobs';
import Link from './index';
import { action } from '@storybook/addon-actions';

// CSF format story
export const link = () => {
  const href = text('href', 'http://innovaccer.com');
  const target = select('target', ['_blank', '_self', '_parent', '_top'], '_blank');

  const options = {
    href,
    target
  };

  return (
    <Link {...options} onClick={action('link click')}>
      Click this link.
    </Link>
  );
};

// Required for CSF format story
// https://medium.com/storybookjs/component-story-format-66f4c32366df
export default { title: 'Typography' };
