import type React from "react";

import "./styles.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  suffix?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, suffix, ...props }) => {
  return (
    <div className="input" data-shunpo-input-root>
      {label && (
        <label htmlFor={label} className="label" data-shunpo-input-label>
          {label}
        </label>
      )}
      <div className="field" data-shunpo-input-field>
        <input id={label} {...props} data-shunpo-input />
        {suffix && (
          <span className="suffix" data-shunpo-input-suffix>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export { Input };
