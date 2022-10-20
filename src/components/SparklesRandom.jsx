import { Sparkles } from '@react-three/drei';
import React, { useMemo } from 'react';

const SparklesRandom = ({ count, size, random, ...props }) => {
  if (!count && count !== 0) count = 100;
  if (!size && size !== 0) size = 5;
  const sizes = useMemo(() => {
    return Array.from({ length: count }, () => size * Math.random());
  }, [count, size]);
  return <Sparkles {...props} count={count} size={random ? sizes : size} />;
};

export default SparklesRandom;
