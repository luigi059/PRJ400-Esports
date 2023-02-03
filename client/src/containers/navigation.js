import React from "react";
import axios from "axios";
import { Navigation } from "../components";
import home from "../images/home.svg";
import feed from "../images/feed.svg";
import inbox from "../images/inbox.svg";
import team from "../images/team.svg";
import search from "../images/search.svg";

export default function NavigationContainer() {
  const logoutUser = async () => {
    await axios.get("http://localhost:5000/user/logout");
    localStorage.clear();
    window.location.href = "/";
  };

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
        <Navigation.Logo src={search} alt="Search" />
        <Navigation.Text> Search </Navigation.Text>
      </Navigation.Item>
      <Navigation.Item onClick={logoutUser}>
        <Navigation.Text> Logout </Navigation.Text>
      </Navigation.Item>
    </Navigation>
  );
}
