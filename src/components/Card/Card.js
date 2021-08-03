import { Row, Col, Typography } from "antd";

import "./Card.css";

const { Title, Text } = Typography;

const Card = ({ title, subtitle }) => {
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
