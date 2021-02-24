import React from 'react';
import { formatAmount } from "../core/numbers";

function getClassName(success, danger) {
  if (!success && !danger) return undefined;
  if (success) return 'text-success';
  return 'text-danger';
}

export default function Amount({ value, success, danger }) {
  return (
    <code className={getClassName(success, danger)}>
      {formatAmount(value)}
    </code>
  );
}
