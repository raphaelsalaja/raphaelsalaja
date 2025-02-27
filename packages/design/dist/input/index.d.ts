import { Input as Input$1 } from '@base-ui-components/react/input';

interface InputProps extends React.ComponentProps<typeof Input$1> {
    label?: string;
    suffix?: React.ReactNode;
}
declare const Input: React.FC<InputProps>;

export { Input };
