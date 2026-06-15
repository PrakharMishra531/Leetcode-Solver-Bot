import React from 'react';
import {Box, Text} from 'ink';

const Complete = ({results}) => {
  const solved = results.filter(r => r.status === 'solved').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const premium = results.filter(r => r.status === 'premium').length;
  const failed = results.filter(r => r.status === 'failed').length;

  return (
    <Box flexDirection="column" marginTop={1} paddingX={2}>
      <Box borderStyle="round" borderColor="#50fa7b" paddingX={1} flexDirection="column" alignItems="center">
        <Text bold color="#50fa7b" marginTop={1}>
          {'  ALL DONE'}
        </Text>
        <Box marginTop={1} gap={3}>
          <Text color="#50fa7b">{solved} solved</Text>
          <Text color="#888">{skipped} skipped</Text>
          {premium > 0 && <Text color="#ffb86c">{premium} premium</Text>}
          {failed > 0 && <Text color="#ff5555">{failed} failed</Text>}
        </Box>
        <Box marginTop={1}>
          <Text color="#555" italic>
            {'"Another day, another LeetCode submission."'}
          </Text>
        </Box>
        <Box marginTop={1} marginBottom={1}>
          <Text color="#FFA116">{'built by Prakhar'}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Complete;
