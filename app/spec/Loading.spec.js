import React from "react";
import { shallow } from "enzyme";
import Loading from "../components/Loading";

test("Loading component should show text prop", () => {
  const TEXT = "hello world";
  const loading = shallow(<Loading text={TEXT} />);

  expect(loading.text()).toEqual(TEXT);
});
