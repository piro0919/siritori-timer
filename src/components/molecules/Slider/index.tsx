import React, { FC, useEffect, useMemo } from "react";
import RcSlider, {
  createSliderWithTooltip,
  SliderProps as RcSliderProps,
} from "rc-slider";
import { ControllerRenderProps } from "react-hook-form";
import { ComponentWrapperProps } from "rc-slider/lib/createSliderWithTooltip";

export type SliderProps = Pick<ControllerRenderProps, "onChange" | "value"> &
  Pick<RcSliderProps, "disabled" | "max" | "min" | "step"> &
  Pick<ComponentWrapperProps, "tipFormatter"> & {
    setValue: (value: any) => void;
  };

const Slider: FC<SliderProps> = ({
  disabled,
  max,
  min,
  onChange,
  setValue,
  step,
  tipFormatter,
  value,
}) => {
  const SliderWithTooltip = useMemo(
    () => createSliderWithTooltip(RcSlider),
    []
  );

  useEffect(() => {
    setValue(value);
  }, [setValue, value]);

  return (
    <SliderWithTooltip
      disabled={disabled}
      max={max}
      min={min}
      onChange={onChange}
      step={step}
      tipFormatter={tipFormatter}
      value={value}
    />
  );
};

export default Slider;
