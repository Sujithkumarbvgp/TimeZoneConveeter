import React, { useState, useEffect, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUndo, faMoon, faSun, faShare, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${(props) => (props.darkMode ? '#121212' : '#f5f5f5')};
  color: ${(props) => (props.darkMode ? '#e0e0e0' : '#1F1F1F')};
  transition: background-color 0.3s, color 0.3s;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Card = styled.div`
  width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.darkMode ? '#333' : '#fff')};
  color: ${(props) => (props.darkMode ? '#e0e0e0' : '#1F1F1F')};
`;

const SliderContainer = styled.div`
  width: 550px;
  margin: 20px 0;
`;

const CustomSlider = styled(Slider)`
  & .MuiSlider-track {
    display: none;
  }

  & .MuiSlider-mark {
    height: 10px;
    width: 2px;
    background-color: ${(props) => (props.darkMode ? '#e0e0e0' : '#1F1F1F')};
  }

  & .MuiSlider-markLabel {
    font-size: 8px;
    text-align: center;
    transform: translateX(-50%);
    white-space: nowrap;
    margin-top: 20px;
    color: ${(props) => (props.darkMode ? '#e0e0e0' : '#1F1F1F')};
  }

  & .MuiSlider-thumb {
    width: 20px;
    height: 20px;
  }

  & .MuiSlider-valueLabel {
    font-size: 8px;
  }
`;

const ZoneHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DeleteButton = styled.button`
  color: ${(props) => (props.darkMode ? '#ff6f61' : 'red')};
  cursor: pointer;
  border: none;
  padding: 6px;
  font-size: large;
  background-color: ${(props) => (props.darkMode ? '#444' : '#FFF')};
`;

const AddButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const ReverseButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: ${(props) => (props.darkMode ? '#333' : '#fff')};
  color: ${(props) => (props.darkMode ? '#e0e0e0' : '#1F1F1F')};
  border: 1px solid ${(props) => (props.darkMode ? '#444' : '#ccc')};
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShareButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: ${(props) => (props.darkMode ? '#333' : '#fff')};
  color: ${(props) => (props.darkMode ? '#e0e0e0' : '#1F1F1F')};
  border: 1px solid ${(props) => (props.darkMode ? '#444' : '#ccc')};
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScheduleButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #d9534f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  padding: 8px 16px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 100px;
`;

const TimeZoneConverter = () => {
  const [timeOffsets, setTimeOffsets] = useState({
    utc: 5.5, // IST offset
    ict: 7,
    est: -5,
    pst: -8,
    ist: 0   // UTC offset
  });

  const [selectedTimeZone, setSelectedTimeZone] = useState('utc');
  const [selectedTimeZoneList, setSelectedTimeZoneList] = useState([
    { id: 'utc', name: 'UTC' },
    { id: 'ist', name: 'IST' },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const now = new Date();
    setSelectedDate(now);
  }, []);

  const handleTimeChange = useCallback((zone, newValue) => {
    const newTimeOffsets = { ...timeOffsets, [zone]: newValue };

    setTimeOffsets({
      ...newTimeOffsets,
      ict: newTimeOffsets.utc + 7,
      est: newTimeOffsets.utc - 5,
      pst: newTimeOffsets.utc - 8,
      ist: newTimeOffsets.utc + 5.5,
    });
  }, [timeOffsets]);

  const handleTimeZoneSelect = (event) => {
    setSelectedTimeZone(event.target.value);
  };

  const handleAddTimeZone = () => {
    const newTimeZone = {
      id: selectedTimeZone,
      name: timeZoneInfo.find((info) => info.zone === selectedTimeZone)?.label,
    };
    setSelectedTimeZoneList([...selectedTimeZoneList, newTimeZone]);
  };

  const handleDeleteTimeZone = (id) => {
    setSelectedTimeZoneList((prevList) => prevList.filter((zone) => zone.id !== id));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedList = Array.from(selectedTimeZoneList);
    const [movedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, movedItem);

    setSelectedTimeZoneList(reorderedList);
  };

  const handleReverseOrder = () => {
    setSelectedTimeZoneList(prevList => [...prevList].reverse());
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleShare = () => {
    const timeZoneParams = selectedTimeZoneList.map(zone => {
      const offset = timeOffsets[zone.id];
      return `${zone.id}=${offset}`;
    }).join('&');

    const dateParam = `date=${selectedDate.toISOString()}`;
    const url = `${window.location.href}?${timeZoneParams}&${dateParam}`;

    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  const handleScheduleMeet = () => {
    const startDate = selectedDate;
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    const formattedStartDate = startDate.toISOString().replace(/-|:|\.\d+/g, '') + 'Z';
    const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, '') + 'Z';

    const meetUrl = `https://meet.google.com/new?start=${formattedStartDate}&end=${formattedEndDate}`;
    window.open(meetUrl, '_blank');
  };

  const timeZoneInfo = [
    { zone: 'utc', label: 'UTC' },
    { zone: 'ict', label: 'ICT' },
    { zone: 'est', label: 'EST' },
    { zone: 'pst', label: 'PST' },
    { zone: 'ist', label: 'IST' },
  ];

  const sliderMarks = Array.from({ length: 24 }).map((_, hour) => {
    const label = `${hour === 0 ? '12:00' : (hour % 12)}:00 ${hour < 12 ? 'AM' : 'PM'}`;
    if (hour % 2 === 0) {
      return { value: hour - 12, label };
    }
    return { value: hour - 12, label: '' };
  });

  const convertDateToTimeZones = (date) => {
    return timeZoneInfo.map(({ zone }) => {
      const offset = timeOffsets[zone] || 0;
      const localDate = new Date(date.getTime() + offset * 3600000);
      return {
        id: zone,
        time: `${localDate.getHours() % 12 || 12}:${localDate.getMinutes().toString().padStart(2, '0')} ${localDate.getHours() >= 12 ? 'PM' : 'AM'}`,
      };
    });
  };

  return (
    <Container darkMode={darkMode}>
      <Heading>Time Zone Converter</Heading>
      <SelectorContainer>
        <label>Select Time Zone: </label>
        <Select value={selectedTimeZone} onChange={handleTimeZoneSelect}>
          {timeZoneInfo.map((info) => (
            <option key={info.zone} value={info.zone}>
              {info.label}
            </option>
          ))}
        </Select>
        <AddButton onClick={handleAddTimeZone}>Add Time Zone</AddButton>
        <ReverseButton onClick={handleReverseOrder}>
          <FontAwesomeIcon icon={faUndo} />
        </ReverseButton>
        <ToggleButton darkMode={darkMode} onClick={handleToggleDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </ToggleButton>
        <ShareButton darkMode={darkMode} onClick={handleShare}>
          <FontAwesomeIcon icon={faShare} />
        </ShareButton>
        <ScheduleButton onClick={handleScheduleMeet}>
          <FontAwesomeIcon icon={faCalendar} />
        </ScheduleButton>
      </SelectorContainer>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
      />
      <CardListContainer>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {selectedTimeZoneList.map((zone, index) => (
                  <Draggable key={zone.id} draggableId={zone.id} index={index}>
                    {(provided) => (
                      <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} darkMode={darkMode}>
                        <ZoneHeading>
                          <h4>{zone.name} Time</h4>
                          <DeleteButton onClick={() => handleDeleteTimeZone(zone.id)} darkMode={darkMode}>
                            <FontAwesomeIcon icon={faXmark} />
                          </DeleteButton>
                        </ZoneHeading>
                        <SliderContainer>
                          <CustomSlider
                            value={timeOffsets[zone.id]}
                            onChange={(_, newValue) => handleTimeChange(zone.id, newValue)}
                            min={-12}
                            max={12}
                            step={0.5}
                            marks={sliderMarks}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value}:00`}
                            darkMode={darkMode}
                          />
                        </SliderContainer>
                        <span>{convertDateToTimeZones(selectedDate).find(tz => tz.id === zone.id)?.time}</span>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardListContainer>
    </Container>
  );
};

export default TimeZoneConverter;
