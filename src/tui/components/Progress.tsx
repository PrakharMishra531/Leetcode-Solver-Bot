import React from 'react';
import {Box, Text} from 'ink';

const STATUS_STYLES = {
  solved: {color: '#50fa7b', icon: '✓', label: 'solved'},
  skipped: {color: '#888', icon: '→', label: 'skipped'},
  premium: {color: '#ffb86c', icon: '◆', label: 'premium'},
  failed: {color: '#ff5555', icon: '✗', label: 'failed'},
  judging: {color: '#f1fa8c', icon: '◎', label: 'judging'},
  queued: {color: '#666', icon: '·', label: 'queued'},
};

const Progress = ({results, total, current, limit}) => {
  return (
    <Box flexDirection="column" marginTop={1} paddingX={2}>
      <Box marginBottom={1}>
        <Text color="#FFA116" bold>{'  PROGRESS'}</Text>
        <Text color="#555">
          {'  ─── '}
        </Text>
        <Text color="#888">
          {`${results.length}/${limit === Infinity ? total : limit}`}
        </Text>
      </Box>

      <Box flexDirection="column" gap={0}>
        {results.map((r, i) => {
          const style = STATUS_STYLES[r.status] || STATUS_STYLES.queued;
          return (
            <Box key={i}>
              <Text color={style.color}>
                {'  '}{style.icon}{' '}
              </Text>
              <Text color="#ccc" strikethrough={r.status === 'skipped'}>
                {r.name}
              </Text>
              <Text color={style.color}>
                {' '}{'→'}{' '}{style.label}
              </Text>
              {r.detail && (
                <Text color="#555">
                  {' '}{r.detail}
                </Text>
              )}
            </Box>
          );
        })}
      </Box>

      {results.length > 0 && (
        <Box marginTop={1}>
          <Text color="#555">{'  ────────────────────────────'}</Text>
        </Box>
      )}

      <Box justifyContent="space-between">
        <Text color="#666">
          {'  '}{results.filter(r => r.status === 'solved').length}{' solved'}
          {'  ·  '}
          {results.filter(r => r.status === 'skipped').length}{' skipped'}
        </Text>
        {current && (
          <Text color="#FFA116" bold>
            {'▸ '}{current}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Progress;
