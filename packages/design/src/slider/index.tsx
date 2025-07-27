"use client";

import { Slider } from "@base-ui-components/react/slider";

import "./styles.css";

interface SliderRootProps extends React.ComponentProps<typeof Slider.Root> {
  size?: "sm" | "md" | "lg";
}

const SliderRoot: React.FC<SliderRootProps> = ({ size = "md", ...props }) => {
  return <Slider.Root {...props} data-shunpo-slider-root data-size={size} />;
};

interface SliderValueProps extends React.ComponentProps<typeof Slider.Value> {}

const SliderValue: React.FC<SliderValueProps> = ({ ...props }) => {
  return <Slider.Value {...props} data-shunpo-slider-value />;
};

interface SliderControlProps
  extends React.ComponentProps<typeof Slider.Control> {}

const SliderControl: React.FC<SliderControlProps> = ({ ...props }) => {
  return <Slider.Control {...props} data-shunpo-slider-control />;
};

interface SliderTrackProps extends React.ComponentProps<typeof Slider.Track> {}

const SliderTrack: React.FC<SliderTrackProps> = ({ ...props }) => {
  return <Slider.Track {...props} data-shunpo-slider-track />;
};

interface SliderIndicatorProps
  extends React.ComponentProps<typeof Slider.Indicator> {}

const SliderIndicator: React.FC<SliderIndicatorProps> = ({ ...props }) => {
  return <Slider.Indicator {...props} data-shunpo-slider-indicator />;
};

interface SliderThumbProps extends React.ComponentProps<typeof Slider.Thumb> {}

const SliderThumb: React.FC<SliderThumbProps> = ({ ...props }) => {
  return <Slider.Thumb {...props} data-shunpo-slider-thumb />;
};

export {
  SliderRoot as Root,
  SliderValue as Value,
  SliderControl as Control,
  SliderTrack as Track,
  SliderIndicator as Indicator,
  SliderThumb as Thumb,
};
