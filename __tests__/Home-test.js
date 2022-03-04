import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../src/HomeScreen';

describe('HomeScreen', () => {

  //snapshot test
  it('renders HomeScreen correctly', (done) => {
    jest.useFakeTimers();
    const tree = renderer.create(<HomeScreen/>).toJSON();
    expect(tree).toMatchSnapshot();
    done()
  });

})