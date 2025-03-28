import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const ClaimsForm = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [claimType, setClaimType] = useState('delay');
  const [reason, setReason] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic here
    // Reset form fields
    setFlightNumber('');
    setReason('');
    setComments('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h6'>Submit a Claim</Typography>
      <TextField label='Flight Number' value={flightNumber} onChange={e => setFlightNumber(e.target.value)} required />
      <TextField
        label='Claim Type'
        select
        value={claimType}
        onChange={e => setClaimType(e.target.value)}
        SelectProps={{
          native: true
        }}
      >
        <option value='delay'>Flight Delay</option>
        <option value='cancellation'>Flight Cancellation</option>
      </TextField>
      <TextField label='Reason' value={reason} onChange={e => setReason(e.target.value)} required />
      <TextField label='Additional Comments' value={comments} onChange={e => setComments(e.target.value)} multiline rows={4} />
      <Button type='submit' variant='contained' color='primary'>
        Submit Claim
      </Button>
    </form>
  );
};

export default ClaimsForm;
