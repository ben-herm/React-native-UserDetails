import React from 'react';
import HeaderButton from '../src/components/main/common/HeaderButton';
import renderer from 'react-test-renderer';

const createTestProps = (props) => ({
  navigation: {
    getParam: jest.fn(),
  },
  ...props,
});

describe('HeaderButton rendering', () => {
  const navigationMock = {navigation: {getParams: {}}};
  it('should render with navigation', () => {
    const rendered = renderer
      .create(<HeaderButton navigation={navigationMock} />)
      .toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});

describe('renders correctly', () => {
  it('renders correctly', () => {
    renderer.create(<HeaderButton />);
  });
});
