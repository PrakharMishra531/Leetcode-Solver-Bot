import React from 'react';
import {Box, Text} from 'ink';

const QUOTE = '"I came, I saw, I copied the optimal solution."';
const ATTRIBUTION = '~ Julius Caesar prolly';

const Banner = () => (
  <Box flexDirection="column" alignItems="center" marginTop={1} marginBottom={1}>
    <Text bold color="#FFA116">
      {'██╗     ██╗███╗   ██╗██╗  ██╗███████╗██████╗ '}
    </Text>
    <Text bold color="#FFA116">
      {'██║     ██║████╗  ██║██║ ██╔╝██╔════╝██╔══██╗'}
    </Text>
    <Text bold color="#FFA116">
      {'██║     ██║██╔██╗ ██║█████╔╝ █████╗  ██████╔╝'}
    </Text>
    <Text bold color="#FFA116">
      {'██║     ██║██║╚██╗██║██╔═██╗ ██╔══╝  ██╔══██╗'}
    </Text>
    <Text bold color="#FFA116">
      {'███████╗██║██║ ╚████║██║  ██╗███████╗██║  ██║'}
    </Text>
    <Text bold color="#FFA116">
      {'╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝'}
    </Text>
    <Text bold color="#FFF" marginTop={1}>
      {'      SOLVER BOT'}
    </Text>
    <Box marginTop={1}>
      <Text italic color="#666">
        {QUOTE}
      </Text>
    </Box>
    <Box marginTop={0}>
      <Text italic color="#555">
        {'                              '}{ATTRIBUTION}
      </Text>
    </Box>
    <Box marginTop={1}>
      <Text color="#888">
        {'built by '}<Text bold color="#FFA116">Prakhar</Text>
      </Text>
    </Box>
  </Box>
);

export default Banner;
