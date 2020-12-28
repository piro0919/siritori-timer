import { FC, useMemo } from "react";
import RcSlider, {
  createSliderWithTooltip,
  SliderProps as RcSliderProps,
} from "rc-slider";
import { ControllerRenderProps } from "react-hook-form";
import { ComponentWrapperProps } from "rc-slider/lib/createSliderWithTooltip";

export type SliderProps = Pick<ControllerRenderProps, "onChange" | "value"> &
  Pick<RcSliderProps, "disabled" | "max" | "min" | "step"> &
  Pick<ComponentWrapperProps, "tipFormatter">;

const Slider: FC<SliderProps> = ({
  disabled,
  max,
  min,
  onChange,
  step,
  tipFormatter,
  value,
}) => {
  const SliderWithTooltip = useMemo(
    () => createSliderWithTooltip(RcSlider),
    []
  );

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
