import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expense from "../../tests/fixtures/expenses";
import expenses from "../../tests/fixtures/expenses";
import moment from "moment";

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with expense data correctly", () => {
  const wrapper = shallow(<ExpenseForm expense={expense[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission ", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", { preventDefault: () => {} });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should change description on input change", () => {
  const value = "New description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(0).simulate("change", { target: { value } });
  expect(wrapper.state("description")).toBe(value);
});

test("should set note on textarea change", () => {
  const value = "New note";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea").simulate("change", { target: { value } });
  expect(wrapper.state("note")).toBe(value);
});

test("should set amount if valid input", () => {
  const value = "23.5";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(1).simulate("change", { target: { value } });
  expect(wrapper.state("amount")).toBe(value);
});

test("should set amount if valid input", () => {
  const value = "23.555";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(1).simulate("change", { target: { value } });
  expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit prop for valid form submission", () => {
  // simulate onSubmit call
  const onSubmitSpy = jest.fn();
  // simulate render
  const wrapper = shallow(
    <ExpenseForm expense={expense[0]} onSubmit={onSubmitSpy} />
  );
  // simulate Onchange event
  wrapper.find("form").simulate("submit", { preventDefault: () => {} });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  });
});

test("should set new date on date function", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("SingleDatePicker").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendar focus on change", () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
