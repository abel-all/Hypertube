"use client"

import { incrementByAmount } from "@/lib/features/counters/countersSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";


export default function HomePage() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <main>
      Hypertube
      
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => dispatch(incrementByAmount(20))}
        >
          Increment
        </button>
        <div>{count}</div>
      </div>
    </main>
  )
}