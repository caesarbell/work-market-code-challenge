import React from 'react';
import { Button } from 'reactstrap';

const AdminSubmitButtons = ({ onClick, name, value }) => {
  return (
    <Button
      className="mt-3 mr-1"
      name={name}
      style={{ width: '200px' }}
      onClick={onClick}
      value={value}
    >
    {name}
    </Button>
  );
};

export default AdminSubmitButtons;
