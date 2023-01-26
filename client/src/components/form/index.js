import React from "react";
import {
  Container,
  Error,
  InputGroup,
  Row,
  Base,
  Title,
  Text,
  Link,
  Input,
  TwoInput,
  Submit,
  CheckBox,
} from "./styles/form";

export default function Form({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Form.Error = function FormError({ children, ...restProps }) {
  return <Error {...restProps}>{children}</Error>;
};

Form.Base = function FormBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};

Form.InputGroup = function FormInputGroup({ children, ...restProps }) {
  return <InputGroup {...restProps}>{children}</InputGroup>;
};

Form.Row = function FormRow({ children, ...restProps }) {
  return <Row {...restProps}>{children}</Row>;
};

Form.Title = function FormTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Form.Text = function FormText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Form.Link = function FormLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Form.Input = function FormInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};

Form.Submit = function FormSubmit({ children, ...restProps }) {
  return <Submit {...restProps}>{children}</Submit>;
};

Form.TwoInput = function FormTwoInput({ children, ...restProps }) {
  return <TwoInput {...restProps}>{children}</TwoInput>;
};

Form.CheckBox = function FormCheckBox({ children, ...restProps }) {
  return <CheckBox {...restProps}>{children}</CheckBox>;
};
