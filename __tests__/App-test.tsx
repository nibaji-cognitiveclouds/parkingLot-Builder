/**
 * @format
 */

import 'react-native';
import React from 'react';
// @ts-ignore
import { mount, shallow } from 'enzyme';

import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import HomeScreen from '../src/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

describe("App", () => {
  it('renders correctly', (done) => {
    jest.useFakeTimers();
    renderer.create(<App />);
    done()
  });

  it('should contain Stack.Screen', function () {
    const Stack = createNativeStackNavigator();
    expect(shallow(<App />).contains(<Stack.Screen name="Home" component={HomeScreen} />)).toBe(true);
  });
})