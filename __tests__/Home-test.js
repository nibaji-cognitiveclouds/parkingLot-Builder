import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../src/HomeScreen';

test('Home renders correctly', (done) => {
  jest.useFakeTimers();
  const tree = renderer.create(<HomeScreen/>).toJSON();
  expect(tree).toMatchSnapshot();
  done()
});