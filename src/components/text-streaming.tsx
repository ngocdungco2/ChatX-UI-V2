"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { MarkdownContent } from "./markdown-content";

type Props = {
  text: any;
  speed?: number;
};

const TextStreaming = ({ text }: Props) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
    setDisplayedText("");
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    const words = textRef.current
      .trim()
      .split(" ")
      .filter((word: string) => word !== "" && word !== undefined);
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < words.length - 1) {
        setDisplayedText((prev) => {
          if (index > 0) {
            return prev + " " + words[index];
          } else {
            return words[index];
          }
        });
        index++;
      } else {
        clearInterval(intervalId);
        setIsComplete(true);
      }
    }, 25);

    return () => clearInterval(intervalId);
  }, [30]);

  return (
    <div>
      <MarkdownContent>{displayedText}</MarkdownContent>
    </div>
  );
};

export default TextStreaming;
