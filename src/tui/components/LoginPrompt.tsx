import React from 'react';
import {Box, Text, useInput} from 'ink';

const LoginPrompt = ({onReady}: {onReady: () => void}) => {
  useInput((input, key) => {
    if (key.return) onReady();
  });

  return (
    <Box flexDirection="column" marginTop={1} paddingX={2}>
      <Box borderStyle="round" borderColor="#FFA116" paddingX={1} flexDirection="column">
        <Text bold color="#FFA116">
          {'  BEFORE WE BEGIN'}
        </Text>
        <Box marginTop={1}>
          <Text color="#ccc">
            {'  The browser will open LeetCode. '}
            <Text bold color="#fff">Log in with your credentials.</Text>
          </Text>
        </Box>
        <Box marginTop={1} flexDirection="column">
          <Text color="#aaa">{'  Heads up:'}</Text>
          <Text color="#888">{'  • Cloudflare may block automated access'}</Text>
          <Text color="#888">{'  • If it does, type your email + password, then:'}</Text>
          <Text color="#888">{'    → Option A: Sign in WITHOUT touching Cloudflare'}</Text>
          <Text color="#888">{'    → Option B: Click Cloudflare, then instantly Sign in'}</Text>
          <Text color="#888">{'  • You have 10 minutes to complete login'}</Text>
        </Box>
        <Box marginTop={1}>
          <Text color="#666">{'  After login, the bot takes over automatically.'}</Text>
        </Box>
        <Box marginTop={1} justifyContent="center">
          <Text bold color="#FFA116">{'  Press ENTER when ready  ▸'}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPrompt;
