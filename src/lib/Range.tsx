import { FunctionComponent } from 'react';

import './Range.scss';

export type RangeProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

export const Range: FunctionComponent<RangeProps> = ({ min, max, value, onChange }) => (
  <div className="range">
    <div className="range-widget">
      <div className="range-start" style={{ flexGrow: value - min }} />
      <div className="range-cursor" />
      <div className="range-end" style={{ flexGrow: max - value }} />
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(event.target.valueAsNumber)}
    />
  </div>
);
