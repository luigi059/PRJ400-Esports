import React from "react";
import { Container, Item, Logo, Text } from "./styles/navigation";

export default function Navigation({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Navigation.Item = function NavigationItem({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

Navigation.Logo = function NavigationHome({ children, ...restProps }) {
  return <Logo {...restProps}></Logo>;
};

Navigation.Text = function NavigationText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};
