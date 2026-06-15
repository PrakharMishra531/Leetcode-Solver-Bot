import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';

const ProblemInput = ({onSubmit}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (val) => {
    const input = val.trim().toLowerCase();
    if (input === 'all') {
      onSubmit(Infinity);
      return;
    }
    const num = parseInt(input, 10);
    if (isNaN(num) || num <= 0) {
      setError('Enter a positive number or "all"');
      return;
    }
    onSubmit(num);
  };

  return (
    <Box flexDirection="column" marginTop={1} paddingX={2}>
      <Box>
        <Text color="#FFA116">{'  ▸ '}</Text>
        <Text color="#ccc">{'How many problems to solve? '}</Text>
        <TextInput
          value={value}
          onChange={setValue}
          onSubmit={handleSubmit}
          placeholder='number or "all"'
          focusColor="#FFA116"
        />
      </Box>
      {error && (
        <Box marginTop={0}>
          <Text color="#ff5555">{'    '}{error}</Text>
        </Box>
      )}
    </Box>
  );
};

export default ProblemInput;
