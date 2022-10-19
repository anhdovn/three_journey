import { Sparkles } from '@react-three/drei';
import React, { useMemo } from 'react';

const SparklesRandom = ({ count, size, random, ...props }) => {
  const sizes = useMemo(() => {
    return Array.from({ length: count }, () => size * Math.random());
  }, [size, count]);
  console.log(sizes);
  return <Sparkles {...props} count={count} size={random ? sizes : size} />;
};

export default SparklesRandom;
