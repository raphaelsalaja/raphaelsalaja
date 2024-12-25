import * as Select from '@/components/select'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import styles from './styles.module.scss'

interface ShowcaseOption {
  label: string
  values: string[] | number | boolean
  onChange?: (value: any) => void
}

interface ShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  options?: ShowcaseOption[]
}

export const Showcase = ({ children, options = [] }: ShowcaseProps) => {
  return (
    <div className={styles.showcase}>
      <div className={styles.component}>{children}</div>
      <div className={styles.options}>
        {options.map((option: ShowcaseOption) => {
          if (Array.isArray(option.values)) {
            return (
              <Select.Root
                key={option.label}
                defaultValue={option.values[0]}
                onValueChange={(value) => option.onChange?.(value as string | number | boolean)} // Handle dropdown changes
                alignItemToTrigger={false}
              >
                <Select.Label>{option.label}</Select.Label>
                <Select.Trigger>
                  <Select.Value placeholder={option.values[0]} />
                  <Select.Icon>
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner side='bottom' sideOffset={8}>
                    <Select.Popup>
                      {option.values.map((value) => (
                        <Select.Item key={value} value={value}>
                          <Select.ItemText>{value}</Select.ItemText>
                          <Select.ItemIndicator>
                            <CheckIcon />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Popup>
                  </Select.Positioner>
                </Select.Portal>
              </Select.Root>
            )
          }

          if (typeof option.values === 'boolean') {
            return (
              <div key={option.label} className={styles.checkbox}>
                <input
                  type='checkbox'
                  id={option.label}
                  onChange={(e) => option.onChange?.(e.target.checked)} /* Trigger onChange */
                />
                <label htmlFor={option.label}>{option.label}</label>
              </div>
            )
          }

          if (typeof option.values === 'number') {
            return (
              <div key={option.label} className={styles.number}>
                <label htmlFor={option.label}>{option.label}</label>
                <input
                  type='number'
                  id={option.label}
                  defaultValue={option.values}
                  onChange={(e) => option.onChange?.(Number(e.target.value))} /* Trigger onChange */
                />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
