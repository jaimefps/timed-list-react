# Experiment with react hooks and smooth UX

Entertained with my useTimedCount hook, I've done other experiments building small things with it. In this case I wanted to create a component with the following interface.

```
<TimedList timeout={number}>
 <Item/>
 <Item/>
 <Item/>
 <Item/>
</TimedList>
```

The two gifs below are examples of code built on top of this custom react-hook.

```
function useTimedCount(max: number, interval?: number) {
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
```

## Examples

With MaterialUI Fade:

![alt-text](with-fade.gif)

With MaterialUI Slide:

![alt-text](with-slide.gif)
