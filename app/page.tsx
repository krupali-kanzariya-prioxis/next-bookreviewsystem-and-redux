"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

function GetGreetingsWithName({ name }: { name: string }) {
  return <h2>Hello, {name}</h2>;
}

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h1>I've rendered {count} times!</h1>;
}
export default function Home() {
  //Day 1(Props, UseState, UseEffect)
  const [count,setCount] = useState(0);
  function IncrementCount(){
    setCount(count+1);
  }

  return (
    //Day 1(Props, UseState, UseEffect)
    // <div>
    //   <GetGreetingsWithName name="Krupali"/>
    //   <h4>{count}</h4>
    //   <button onClick={IncrementCount}>Increment</button>
    //   <Timer/>
    // </div>

    //Day 2 (Routing with UseState)
    <div className="center-page">
      <h1 className="text-m font-bold">Welcome to Home Page</h1>
    </div>
  );
}
