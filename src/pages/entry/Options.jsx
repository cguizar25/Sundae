import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from './ScoopOption';
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function Options({ optionType }) {
  const [ items, setItems ] = useState([]);
  const [ error, setError ] = useState(false);
  const { total } = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase + optionType.slice(1).toLowerCase();
  console.log(title)
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>
        {formatCurrency(pricePerItem[optionType])} each
      </p>
      <p>
        {title} total: {formatCurrency(total[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
