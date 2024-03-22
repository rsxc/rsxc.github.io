import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FadingTextComponentProps {
  text: string;
}

const FadingTextComponent: React.FC<FadingTextComponentProps> = ({ text }) => {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    setWords(text.split(' '));
  }, [text]);

  return (
    <div>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.1 }}
        >
          {word + ' '}
        </motion.span>
      ))}
    </div>
  );
};

export default FadingTextComponent;