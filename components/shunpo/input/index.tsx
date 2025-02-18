import { Input as InputPrimitive } from '@base-ui-components/react/input'

import styles from './styles.module.scss'

interface InputProps extends React.ComponentProps<typeof InputPrimitive> {
  label?: string
  suffix?: React.ReactNode
}

const Input: React.FC<InputProps> = ({ children, label, ...props }) => {
  return (
    <div className={styles.input}>
      {label && (
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.field}>
        <InputPrimitive id={label} {...props}>
          {children}
        </InputPrimitive>
        {props.suffix && <span className={styles.suffix}>{props.suffix}</span>}
      </div>
    </div>
  )
}

export { Input }
