import React from 'react';
import {CustomLoader} from '../src/components/main/common/CustomLoader';
import renderer from 'react-test-renderer';

describe('renders correctly', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<CustomLoader size={50} />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});
