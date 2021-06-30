import React from "react";
import ShallowRenderer from "react-test-renderer/shallow"; // ES6
import Header from "../../components/Header";
import { shallow } from "enzyme";

// test("should render Header correctly", () => {
//   const renderer = new ShallowRenderer();
//   renderer.render(<Header />);
//   expect(renderer.getRenderOutput()).toMatchSnapshot();
// });

test("should render Header correctly", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
  // expect(wrapper.find("h1").length).toBe(1);
  // expect(wrapper.find("h1").text()).toBe("Expensify");
});
