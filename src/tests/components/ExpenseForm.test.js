import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expense from "../../tests/fixtures/expenses";

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with expense data correctly", () => {
  const wrapper = shallow(<ExpenseForm expense={expense[1]} />);
  expect(wrapper).toMatchSnapshot();
});
