import React, { useState } from "react";
import NavigationContainer from "../containers/navigation";
import { MainDisplay, Profile } from "../components";
import miracle from "../images/miracle.jfif";
import youtube from "../images/youtube.png";
import twitch from "../images/twitch.png";
import team from "../images/team.jpg";

export default function ProfilePage() {
  const [ytLink] = useState(
    "https://www.youtube.com/channel/UCqmJgdqMIWlrGCUdlEZBawg"
  );
  const [twitchLink] = useState("https://www.twitch.tv/miracle_doto");

  const ytHandleClick = () => {
    window.location.href = ytLink;
  };
  const twitchHandleClick = () => {
    window.location.href = twitchLink;
  };

  return (
    <>
      <MainDisplay>
        <MainDisplay.Left>
          <NavigationContainer></NavigationContainer>
          <MainDisplay.Logo src={team} alt="Twitch" />
        </MainDisplay.Left>
        <MainDisplay.Right>
          <MainDisplay.RightBase>
            <Profile.FirstProfile>
              <Profile.PlayerImgContainer>
                <Profile.PlayerImg src={miracle} alt="Profile Image" />
              </Profile.PlayerImgContainer>
              <Profile.InfoSection>
                <Profile.InfoTitle>INFO</Profile.InfoTitle>
                <Profile.Text>Amer Al-Barkawi</Profile.Text>
                <Profile.Text>25 years old</Profile.Text>
                <Profile.Text>Position 2</Profile.Text>
              </Profile.InfoSection>
              <Profile.InfoSection>
                <Profile.InfoTitle>TEAM INFO</Profile.InfoTitle>
                <Profile.Text>Contracted To</Profile.Text>
                <Profile.Text>Nigma Galaxy</Profile.Text>
                <Profile.Text>Europe</Profile.Text>
              </Profile.InfoSection>
            </Profile.FirstProfile>

            <Profile.SecondProfile>
              <Profile.Section>
                <Profile.Title>MEDIA</Profile.Title>

                <Profile.MediaSection>
                  <Profile.MediaSubSection>
                    <Profile.Logo
                      src={youtube}
                      alt="Youtube"
                      onClick={ytHandleClick}
                    />
                  </Profile.MediaSubSection>
                  <Profile.MediaSubSection>
                    <Profile.Logo
                      src={twitch}
                      alt="Twitch"
                      onClick={twitchHandleClick}
                    />
                  </Profile.MediaSubSection>
                </Profile.MediaSection>
              </Profile.Section>
              <Profile.Section>
                <Profile.Title>RATING</Profile.Title>
                <Profile.SubSection>
                  <Profile.Rating>
                    <Profile.RatingSection></Profile.RatingSection>
                    <Profile.RatingSection>
                      <Profile.RatingSubSection>
                        <Profile.RatingText>Overall</Profile.RatingText>
                        <Profile.RatingText>Leadership</Profile.RatingText>
                        <Profile.RatingText>Game Knowledge</Profile.RatingText>
                        <Profile.RatingText>Versatility</Profile.RatingText>
                        <Profile.RatingText>
                          Technical Skills
                        </Profile.RatingText>
                        <Profile.RatingText>Farming</Profile.RatingText>
                      </Profile.RatingSubSection>
                      <Profile.RatingSubSection>
                        <Profile.RatingText>8.2</Profile.RatingText>
                        <Profile.RatingText>4</Profile.RatingText>
                        <Profile.RatingText>8</Profile.RatingText>
                        <Profile.RatingText>9</Profile.RatingText>
                        <Profile.RatingText>10</Profile.RatingText>
                        <Profile.RatingText>10</Profile.RatingText>
                      </Profile.RatingSubSection>
                    </Profile.RatingSection>
                    <Profile.RatingSection></Profile.RatingSection>
                  </Profile.Rating>
                </Profile.SubSection>
              </Profile.Section>
            </Profile.SecondProfile>
            <Profile.SecondProfile>
              <Profile.Section>
                <Profile.Title>FEED</Profile.Title>
                <Profile.SubSection>
                  <Profile.InboxSection>
                    <Profile.RatingText>No New Feed</Profile.RatingText>
                  </Profile.InboxSection>
                </Profile.SubSection>
              </Profile.Section>
              <Profile.Section>
                <Profile.Title>INBOX</Profile.Title>
                <Profile.SubSection>
                  <Profile.InboxSection>
                    <Profile.RatingText>No Messages</Profile.RatingText>
                  </Profile.InboxSection>
                </Profile.SubSection>
              </Profile.Section>
            </Profile.SecondProfile>
          </MainDisplay.RightBase>
        </MainDisplay.Right>
      </MainDisplay>
    </>
  );
}
