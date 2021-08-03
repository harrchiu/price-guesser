import { Row, Col, Button, Space, Typography, Input, Form } from "antd";
import { Card } from "./components/Card/Card";
import { useState } from "react";

import "./App.css";

const { Text } = Typography;

const addCard = ({
  cards,
  setCards,
  titleInput,
  subtitleInput,
  setTitleInput,
  setSubtitleInput,
}) => {
  if (titleInput && subtitleInput) {
    const newCard = { title: titleInput, subtitle: subtitleInput };
    setCards(cards.push(newCard));

    console.log("hello", cards);

    setTitleInput("");
    setSubtitleInput("");
  }
};

function App() {
  const [titleInput, setTitleInput] = useState("");
  const [subtitleInput, setSubtitleInput] = useState("");
  const [cards, setCards] = useState([
    { title: "this is a default title", subtitle: "and subtitle" },
  ]);

  return (
    <div className="App">
      <h1 className="title">helloooo</h1>
      <Button
        size="large"
        onClick={addCard(
          cards,
          setCards,
          titleInput,
          subtitleInput,
          setTitleInput,
          setSubtitleInput
        )}
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
