import { Row, Col, Button, Typography } from "antd";
import { useState } from "react";

import "./Card.css";

// const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const { Title, Text } = Typography;

const Card = ({ title, subtitle }) => {
  const [q, setQ] = useState(0);
  return (
    <div className="card">
      <Text level={3} className="card__title">
        {title}
      </Text>
      <Text level={5} className="card__subtitle">
        {subtitle}
      </Text>
    </div>
  );
};

export default Card;
export { Card };
