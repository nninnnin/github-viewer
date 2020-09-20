import React from "react";
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from "enzyme";
import Loading from "../components/Loading";

beforeEach(() => {
  jest.useFakeTimers();
})

afterEach(() => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
})

test("Snapshot test", () => {
  const TEXT = "hello world";
  const loading = mount(<Loading text={TEXT} />);

  expect(loading).toMatchSnapshot();
});

test("Should have prop name of text and delivered value", () => {
  const TEXT = "PROPTEST";
  const wrapper = mount(<Loading text={TEXT} />);

  expect(wrapper.props().text).toEqual('PROPTEST');
});

test("Loading component should show value of text prop", () => {
  const TEXT = "hello world";
  const loading = shallow(<Loading text={TEXT} />);

  expect(loading.text()).toEqual(TEXT);
});

test('Tests for setInterval callback using advanceTimer', () => {
  const initialText = 'initialText';
  const wrapper = mount(<Loading speed = {500} text = {initialText}/>);

  expect(wrapper.text()).toEqual(initialText);

  act(() => {
    jest.advanceTimersByTime(1600);
  });

  expect(wrapper.text()).toEqual(initialText + '...');
});

test('Tests for pending timers', () => {
  const initialText = 'initialText';
  const wrapper = mount(<Loading speed = {500} text = {initialText}/>);

  expect(wrapper.text()).toEqual(initialText);

  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(wrapper.text()).toEqual(initialText + '.');
});

test('Tests for pending timers 2', () => {
  const initialText = 'initialText';
  const wrapper = mount(<Loading speed = {500} text = {initialText}/>);

  expect(wrapper.text()).toEqual(initialText);

  act(() => {
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
  });
  expect(wrapper.text()).toEqual(initialText + '..');
});

test('Tests for pending timers 3', () => {
  const initialText = 'initialText';
  const wrapper = mount(<Loading speed = {500} text = {initialText}/>);

  expect(wrapper.text()).toEqual(initialText);

  act(() => {
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
  });
  expect(wrapper.text()).toEqual(initialText + '...');
});
