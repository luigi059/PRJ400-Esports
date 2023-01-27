import React from "react";
import NavigationContainer from "../containers/navigation";
import { MainDisplay } from "../components";
import miracle from "../images/miracle.jfif";
import youtube from "../images/youtube.png";
import twitch from "../images/twitch.png";

export default function Profile() {
  return (
    <>
      <MainDisplay>
        <MainDisplay.Left>
          <NavigationContainer></NavigationContainer>
        </MainDisplay.Left>
        <MainDisplay.Right>
          <MainDisplay.RightBase>
            {/* INFO SECTION */}
            <MainDisplay.FirstProfile>
              <MainDisplay.PlayerImgContainer>
                <MainDisplay.PlayerImg src={miracle} alt="Profile Image" />
              </MainDisplay.PlayerImgContainer>
              <MainDisplay.InfoSection>
                <MainDisplay.InfoTitle>INFO</MainDisplay.InfoTitle>
                <MainDisplay.Text>Amer Al-Barkawi</MainDisplay.Text>
                <MainDisplay.Text>25 years old</MainDisplay.Text>
                <MainDisplay.Text>Position 2</MainDisplay.Text>
              </MainDisplay.InfoSection>
              <MainDisplay.InfoSection>
                <MainDisplay.InfoTitle>TEAM INFO</MainDisplay.InfoTitle>
                <MainDisplay.Text>Contracted To</MainDisplay.Text>
                <MainDisplay.Text>Nigma Galaxy</MainDisplay.Text>
                <MainDisplay.Text>Europe</MainDisplay.Text>
              </MainDisplay.InfoSection>
            </MainDisplay.FirstProfile>

            <MainDisplay.SecondProfile>
              <MainDisplay.Section>
                <MainDisplay.Title>MEDIA</MainDisplay.Title>

                <MainDisplay.MediaSection>
                  <MainDisplay.MediaSubSection>
                    <MainDisplay.Logo src={youtube} alt="Youtube" />
                  </MainDisplay.MediaSubSection>
                  <MainDisplay.MediaSubSection>
                    <MainDisplay.Logo src={twitch} alt="Twitch" />
                  </MainDisplay.MediaSubSection>
                </MainDisplay.MediaSection>
              </MainDisplay.Section>
              <MainDisplay.Section>
                <MainDisplay.Title>RATING</MainDisplay.Title>
                <MainDisplay.SubSection>
                  <MainDisplay.Rating>
                    <MainDisplay.RatingSection></MainDisplay.RatingSection>
                    <MainDisplay.RatingSection></MainDisplay.RatingSection>
                    <MainDisplay.RatingSection></MainDisplay.RatingSection>
                  </MainDisplay.Rating>
                </MainDisplay.SubSection>
              </MainDisplay.Section>
            </MainDisplay.SecondProfile>
            <MainDisplay.SecondProfile>
              <MainDisplay.Section>
                <MainDisplay.Title>FEED</MainDisplay.Title>
                <MainDisplay.SubSection></MainDisplay.SubSection>
              </MainDisplay.Section>
              <MainDisplay.Section>
                <MainDisplay.Title>INBOX</MainDisplay.Title>
                <MainDisplay.SubSection></MainDisplay.SubSection>
              </MainDisplay.Section>
            </MainDisplay.SecondProfile>
          </MainDisplay.RightBase>
        </MainDisplay.Right>
      </MainDisplay>
    </>
  );
}
