import React from 'react';
import { Button } from 'reactstrap';

const AdminSubmitButtons = ({ onClick, name }) => {
  return (
    <Button
      className="mt-3 mr-1"
      name={name}
      style={{ width: '200px' }}
      onClick={onClick}
    >
    {name}
    </Button>
  );
};

export default AdminSubmitButtons;
