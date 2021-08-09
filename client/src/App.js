import { Row, Col, Button, Space, Typography, Input, Form } from "antd";
import { Card } from "./components/Card/Card";
import { useState } from "react";

// import firebase from "firebase/app";

import "./App.css";
// var scrape = require("mongoose");

const { Text } = Typography;

// const mongoose = require("mongoose");

// const uri =
//   "";

// mongoose.connect(uri, { useNewUrlParser: true }, () =>
//   console.log("we are in boys")
// );
// const db = mongoose.connection;
// db.once("open", (_) => {
//   console.log("Database connected:", uri);
// });

// db.on("error", (err) => {
//   console.error("connection error:", err);
// });

// // npm web-scraper stuff

// const npmScraper = async () => {
//   const options = {
//     urls: [
//       "https://www.amazon.ca/Best-Sellers-generic/zgbs/?ref_=nav_cs_bestsellers_5e07a0361d744326ae799da4b354adca",
//     ],
//     directory: "/path/to/save/",
//   };

//   // with async/await
//   const result = await scrape(options);
//   console.log(result);

//   // with promise

//   return result;
//   // scrape(options, (error, result) => {});
// };

function App() {
  const [titleInput, setTitleInput] = useState("");
  const [subtitleInput, setSubtitleInput] = useState("");
  const [cards, setCards] = useState([
    { title: "this is a default title", subtitle: "and subtitle" },
  ]);

  // npmScraper();

  return (
    <div className="App">
      <h1 className="title">helloooo</h1>
      <Button
        size="large"
        // onClick={addCard(
        //   cards,
        //   setCards,
        //   titleInput,
        //   subtitleInput,
        //   setTitleInput,
        //   setSubtitleInput
        // )}
      >
        new card
      </Button>
      <Input
        placeholder="title"
        className="title"
        onChange={(value) => {
          setTitleInput(value);
        }}
      />
      <Input
        placeholder="subtitle"
        className="subtitle"
        onChange={(value) => {
          setSubtitleInput(value);
        }}
      />
      <Space wrap={false} size="small">
        <Text>left</Text>
        <Text>ri</Text>
      </Space>

      <Card
        title={"what gives man"}
        subtitle={
          "another one as always and can you believe the time that we are asking for"
        }
      />
    </div>
  );
}

export default App;
