import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ReadMoreButton = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = isTruncated ? text?.slice(0, maxLength) : text;
  const buttonText = isTruncated ? 'Read More' : 'Read Less';

  return (
    <>
      <p>{truncatedText}</p>
      {text && text.length > maxLength && (
        <Button variant="link" onClick={toggleTruncate}>
          {buttonText}
        </Button>
      )}
    </>
  );
};

export default ReadMoreButton;
