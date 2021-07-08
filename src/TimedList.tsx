import React, { FC, useEffect, useState } from "react";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Slide, { SlideProps } from "@material-ui/core/Slide";
import Fade, { FadeProps } from "@material-ui/core/Fade";

export const TRANSITION_BASE = 600;
export const TRANSITION_FAST = TRANSITION_BASE * 0.15;
export const TRANSITION_SLOW = TRANSITION_BASE * 1.85;

export function useTimedCount(max: number, interval?: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < max) {
        setCount(count + 1);
      }
    }, interval ?? 1);
    return () => {
      clearTimeout(timeout);
    };
  }, [count, setCount, interval, max]);
  return count;
}

const useTimedItems = (items: any[], interval?: number) => {
  const count = useTimedCount(items.length, interval);
  return items.slice(0, count);
};

const useMountDelay = (callback: any, delay: number) => {
  useEffect(() => {
    setTimeout(() => {
      callback();
    }, delay);
  }, []);
};

interface TimedListProps {
  timeout?: number;
  gridProps?: Omit<GridProps, "container">;
  gridItemProps?: Omit<GridProps, "item">;
  slideProps?: Omit<SlideProps, "in">;
  fadeProps?: Omit<FadeProps, "in">;
}
export const TimedList: FC<TimedListProps> = ({
  children,
  timeout = TRANSITION_FAST,
  gridProps = {},
  gridItemProps = {},
  slideProps = {},
  fadeProps = {},
}) => {
  const childArray = React.Children.toArray(children);
  const timedChildren = useTimedItems(childArray, timeout);
  const withTransitions = timedChildren.map((child, idx) => (
    <Grid key={idx} item {...gridItemProps}>
      <Slide in direction="right" timeout={TRANSITION_BASE} {...slideProps}>
        <div className="timed-list-item-slide">
          <Fade in timeout={TRANSITION_BASE} {...fadeProps}>
            <div className="timed-list-item-fade">{child}</div>
          </Fade>
        </div>
      </Slide>
    </Grid>
  ));
  return (
    <Grid container {...gridProps}>
      {withTransitions}
    </Grid>
  );
};

type BoxProps = { message: string; className?: string };
export const Box: FC<BoxProps> = ({ message }) => (
  <div
    style={{
      border: "1px solid grey",
      width: "300px",
      height: "30px",
      margin: "0 auto",
    }}
  >
    {message}
  </div>
);

// Example use of <TimedList/>:
export const TimedBoxes = () => {
  const [boxes, setBoxes] = useState([
    { text: "message 1" },
    { text: "message 2" },
    { text: "message 3" },
    { text: "message 4" },
    { text: "message 5" },
    { text: "message 6" },
  ]);

  useMountDelay(() => {
    setBoxes((boxes: any) => [
      ...boxes,
      { text: "later message 1" },
      { text: "later message 2" },
      { text: "later message 3" },
      { text: "later message 4" },
      { text: "later message 5" },
      { text: "later message 6" },
    ]);
  }, 2500);

  useMountDelay(() => {
    setBoxes((boxes: any) => [
      ...boxes,
      { text: "even later 1" },
      { text: "even later 2" },
      { text: "even later 3" },
      { text: "even later 4" },
      { text: "even later 5" },
      { text: "even later 6" },
      { text: "even later 7" },
      { text: "even later 8" },
    ]);
  }, 5000);

  return (
    <TimedList
      slideProps={{ timeout: TRANSITION_SLOW }}
      fadeProps={{ timeout: TRANSITION_SLOW }}
      gridProps={{ spacing: 1, direction: "column" }}
    >
      {boxes.map(({ text }) => (
        <Box key={text} message={text} />
      ))}
    </TimedList>
  );
};
