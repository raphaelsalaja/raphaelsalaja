import { Input as InputPrimitive } from "@base-ui-components/react/input";

import "./styles.css";

interface InputProps extends React.ComponentProps<typeof InputPrimitive> {
  label?: string;
  suffix?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ children, label, ...props }) => {
  return (
    <div className="input">
      {label && (
        <label htmlFor={label} className="label">
          {label}
        </label>
      )}
      <div className="field">
        <InputPrimitive id={label} {...props}>
          {children}
        </InputPrimitive>
        {props.suffix && <span className="suffix">{props.suffix}</span>}
      </div>
    </div>
  );
};

export { Input };
