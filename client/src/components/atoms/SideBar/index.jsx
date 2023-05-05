import React, { useState } from 'react';

/* Children */
import { BsArrowUp as ArrowUp } from 'react-icons/bs';

/* Styles */
import Styled from './Styled';

export default function SideBar() {
  const [active, setActive] = useState(true);

  return (
    <Styled>
      <header onClick={() => setActive(!active)}>
        <h3>Categories</h3>
        <ArrowUp className={`Icon ${active ? 'active' : 'disabled'}`} />
      </header>

      <ul className={`Categories ${active ? 'active' : 'disabled'}`}>
        <li id="beverages" className="Selected">
          <span>Beverages</span>
        </li>
        <li id="dessert">
          <span>Dessert</span>
        </li>
        <li id="fast-food">
          <span>Fast Food</span>
        </li>
        <li id="healthy">
          <span>Healthy</span>
        </li>
        <li id="iced-coffee">
          <span>Iced Coffee</span>
        </li>
        <li id="mexican">
          <span>Mexican</span>
        </li>
        <li id="milkshake">
          <span>Milkshake</span>
        </li>
        <li id="sushi">
          <span>Sushi</span>
        </li>
        <li id="thai">
          <span>Thai</span>
        </li>
        <li id="veggie">
          <span>Veggie</span>
        </li>
      </ul>
    </Styled>
  );
}
