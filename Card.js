import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CardContainer = styled.div`
  width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ZoneHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DeleteButton = styled.button`
  position: relative;
  top: 5px;
  right: 5px;
  z-index: 1;
  color: red;
  cursor: pointer;
  border: none;
  padding: 6px;
  font-size: large;
  background-color: #FFF;
`;

const Card = ({ zone, offset, onDelete, sliderComponent }) => {
  const now = new Date(); // Current UTC time
  const timeZoneTime = new Date(now.getTime() + offset * 3600000);

  // Extract hours and minutes from the local time
  const hours = timeZoneTime.getHours();
  const minutes = timeZoneTime.getMinutes();

  // Determine if it's AM or PM
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  
  return (
    <CardContainer>
      <ZoneHeading>
        <h4>{zone.name} Time</h4>
        <DeleteButton onClick={onDelete}>
          <FontAwesomeIcon icon={faXmark} />
        </DeleteButton>
      </ZoneHeading>
      {sliderComponent}
      <span>{`${formattedHours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`}</span>
    </CardContainer>
  );
};

export default Card;
