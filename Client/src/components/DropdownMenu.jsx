import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import "./DropdownMenu.css"

const DropdownMenu = ({ list, defaultValue }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(defaultValue);
  const [maxListItemWidth, setMaxListItemWidth] = useState(0);

  useEffect(() => {
    if (isDropdownOpen || maxListItemWidth === 0) {
      const listItemWidths = list.map((listItem) => {
        // Create a temporary span element to measure the width of the text
        const span = document.createElement('span');
        span.innerText = listItem;
        document.body.appendChild(span);
        const width = span.offsetWidth;
        document.body.removeChild(span);
        return width;
      });

      // Find the maximum width among list items
      const maxWidth = Math.max(...listItemWidths);

      // Set the button width to the maximum list item width
      setMaxListItemWidth(maxWidth);
    }
  }, [isDropdownOpen, list]);


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const selectItem = (item) => {
    setActiveItem(item);
    setDropdownOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="dropdown">
      <Button onClick={toggleDropdown} text={activeItem} classNames={'btn btn-2'} btnStyle={{ width: `calc(${maxListItemWidth}px + 1.2rem)` }}/>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          {list.map((listItem) => (
            <li 
            key={listItem}
            onClick={() => selectItem(listItem)}
            className={`/${activeItem=== listItem ? 'active' : ''}`}
            >
              {listItem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
