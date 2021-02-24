import React from "react";
import Emoji from "./Emoji";

export default function Loading() {
  return (
    <section className="loading">
      <Emoji value="⌛" />
    </section>
  );
}
