import * as React from 'react';
import { shallow } from 'enzyme';
import Backdrop, { IBackdropProps as IProps } from '../Backdrop';
import { testHelper, filterUndefined, valueHelper, testMessageHelper } from '@/utils/testHelper';

const booleanValue = [true, false];

describe('Backdrop component', () => {
  const mapper = {
    open: valueHelper(booleanValue, { required: true, iterate: true })
  };

  const testFunc = (props: Record<string, any>): void => {
    const attr = filterUndefined(props) as IProps;

    it(testMessageHelper(attr), () => {
      const tree = shallow(
        <Backdrop
          {...attr}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  };

  testHelper(mapper, testFunc);
});
