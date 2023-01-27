import React from "react";
import {
  Background,
  Left,
  Right,
  RightBase,
  FirstProfile,
  PlayerImgContainer,
  PlayerImg,
  InfoSection,
  InfoTitle,
  SecondProfile,
  Section,
  SubSection,
  MediaSection,
  MediaSubSection,
  Title,
  Logo,
  Text,
  Rating,
  RatingSection,
} from "./styles/bg";

export default function MainDisplay({ bg = true, children, ...restProps }) {
  return bg ? (
    <Background data-testid="header-bg" {...restProps}>
      {children}
    </Background>
  ) : (
    children
  );
}

MainDisplay.Left = function MainLeft({ children, ...restProps }) {
  return <Left {...restProps}>{children}</Left>;
};

MainDisplay.Right = function MainRight({ children, ...restProps }) {
  return <Right {...restProps}>{children}</Right>;
};

MainDisplay.RightBase = function MainRightBase({ children, ...restProps }) {
  return <RightBase {...restProps}>{children}</RightBase>;
};

MainDisplay.FirstProfile = function MainDisplayFirstProfile({
  children,
  ...restProps
}) {
  return <FirstProfile {...restProps}>{children}</FirstProfile>;
};
MainDisplay.PlayerImgContainer = function MainDisplayPlayerImgContainer({
  children,
  ...restProps
}) {
  return <PlayerImgContainer {...restProps}>{children}</PlayerImgContainer>;
};
MainDisplay.PlayerImg = function MainDisplayPlayerImg({
  children,
  ...restProps
}) {
  return <PlayerImg {...restProps}></PlayerImg>;
};
MainDisplay.InfoSection = function MainDisplayInfoSection({
  children,
  ...restProps
}) {
  return <InfoSection {...restProps}>{children}</InfoSection>;
};
MainDisplay.InfoTitle = function MainDisplayInfoTitle({
  children,
  ...restProps
}) {
  return <InfoTitle {...restProps}>{children}</InfoTitle>;
};

MainDisplay.SecondProfile = function MainDisplaySecondProfile({
  children,
  ...restProps
}) {
  return <SecondProfile {...restProps}>{children}</SecondProfile>;
};
MainDisplay.Section = function MainDisplaySection({ children, ...restProps }) {
  return <Section {...restProps}>{children}</Section>;
};
MainDisplay.SubSection = function MainDisplaySubSection({
  children,
  ...restProps
}) {
  return <SubSection {...restProps}>{children}</SubSection>;
};
MainDisplay.MediaSection = function MainDisplayMediaSection({
  children,
  ...restProps
}) {
  return <MediaSection {...restProps}>{children}</MediaSection>;
};
MainDisplay.MediaSubSection = function MainDisplayMediaSubSection({
  children,
  ...restProps
}) {
  return <MediaSubSection {...restProps}>{children}</MediaSubSection>;
};
MainDisplay.Title = function MainDisplayTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};
MainDisplay.Logo = function MainDisplayLogo({ children, ...restProps }) {
  return <Logo {...restProps}></Logo>;
};
MainDisplay.Text = function MainDisplayText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};
MainDisplay.Rating = function MainDisplayRating({ children, ...restProps }) {
  return <Rating {...restProps}>{children}</Rating>;
};
MainDisplay.RatingSection = function MainDisplayRating({
  children,
  ...restProps
}) {
  return <RatingSection {...restProps}>{children}</RatingSection>;
};
