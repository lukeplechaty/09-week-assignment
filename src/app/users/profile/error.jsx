"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <>
      <h2>Error on page</h2>
      <p>{error.message}</p>
      <Link href={"/"}>Return Home</Link>
      <button onClick={() => reset()}>Try again</button>
    </>
  );
}
