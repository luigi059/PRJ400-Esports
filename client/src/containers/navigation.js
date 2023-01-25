import React from "react";
import { Navigation } from "../components";
import home from "../images/home.svg";
import feed from "../images/feed.svg";
import inbox from "../images/inbox.svg";
import team from "../images/team.svg";
import search from "../images/search.svg";
import schedule from "../images/schedule.svg";
import contract from "../images/contract.svg";

export default function NavigationContainer() {
  return (
    <Navigation>
      <Navigation.Item>
        <Navigation.Logo src={home} alt="Home" />
        <Navigation.Text> Home </Navigation.Text>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Logo src={feed} alt="Feed" />
        <Navigation.Text> Feed </Navigation.Text>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Logo src={inbox} alt="Inbox" />
        <Navigation.Text> Inbox </Navigation.Text>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Logo src={team} alt="Team" />
        <Navigation.Text> Team </Navigation.Text>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Logo src={home} alt="Home" />
        <Navigation.Text> Home </Navigation.Text>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Logo src={search} alt="Search" />
        <Navigation.Text> Search </Navigation.Text>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Logo src={schedule} alt="Schedule" />
        <Navigation.Text> Schedule </Navigation.Text>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Logo src={contract} alt="Contract" />
        <Navigation.Text> Contract </Navigation.Text>
      </Navigation.Item>
    </Navigation>
  );
}
