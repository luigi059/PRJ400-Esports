import React from "react";

import {
  Container,
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
  RatingSubSection,
  RatingText,
  InboxSection,
} from "./styles/profile";

export default function Profile({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Profile.FirstProfile = function ProfileFirstProfile({
  children,
  ...restProps
}) {
  return <FirstProfile {...restProps}>{children}</FirstProfile>;
};

Profile.PlayerImgContainer = function ProfilePlayerImgContainer({
  children,
  ...restProps
}) {
  return <PlayerImgContainer {...restProps}>{children}</PlayerImgContainer>;
};

Profile.PlayerImg = function ProfilePlayerImg({ children, ...restProps }) {
  return <PlayerImg {...restProps}></PlayerImg>;
};

Profile.InfoSection = function ProfileInfoSection({ children, ...restProps }) {
  return <InfoSection {...restProps}>{children}</InfoSection>;
};

Profile.InfoTitle = function ProfileInfoTitle({ children, ...restProps }) {
  return <InfoTitle {...restProps}>{children}</InfoTitle>;
};

Profile.SecondProfile = function ProfileSecondProfile({
  children,
  ...restProps
}) {
  return <SecondProfile {...restProps}>{children}</SecondProfile>;
};

Profile.Section = function ProfileSection({ children, ...restProps }) {
  return <Section {...restProps}>{children}</Section>;
};

Profile.SubSection = function ProfileSubSection({ children, ...restProps }) {
  return <SubSection {...restProps}>{children}</SubSection>;
};

Profile.MediaSection = function ProfileMediaSection({
  children,
  ...restProps
}) {
  return <MediaSection {...restProps}>{children}</MediaSection>;
};

Profile.MediaSubSection = function ProfileMediaSubSection({
  children,
  ...restProps
}) {
  return <MediaSubSection {...restProps}>{children}</MediaSubSection>;
};

Profile.Title = function ProfileTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Profile.Logo = function ProfileLogo({ children, ...restProps }) {
  return <Logo {...restProps}></Logo>;
};

Profile.Text = function ProfileText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Profile.Rating = function ProfileRating({ children, ...restProps }) {
  return <Rating {...restProps}>{children}</Rating>;
};

Profile.RatingSection = function ProfileRatingSection({
  children,
  ...restProps
}) {
  return <RatingSection {...restProps}>{children}</RatingSection>;
};

Profile.RatingSubSection = function ProfileRatingSubSection({
  children,
  ...restProps
}) {
  return <RatingSubSection {...restProps}>{children}</RatingSubSection>;
};

Profile.RatingText = function ProfileRatingText({ children, ...restProps }) {
  return <RatingText {...restProps}>{children}</RatingText>;
};

Profile.InboxSection = function ProfileInboxSection({
  children,
  ...restProps
}) {
  return <InboxSection {...restProps}>{children}</InboxSection>;
};
