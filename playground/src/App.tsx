import { useState } from 'react';
import {
  // Core Components
  Button,
  Input,
  Select,
  Checkbox,
  Switch,
  Slider,
  Progress,
  Meter,
  
  // Form Components
  Field,
  NumberField,
  
  // Utility
  Avatar,
  Toggle,
  
  // Hooks and Utilities
  ConditionalWrap
} from '@rs/design';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [sliderValue, setSliderValue] = useState([50]);
  const [progressValue] = useState(65);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [numberValue, setNumberValue] = useState(10);
  const [toggleValue, setToggleValue] = useState(false);
  const [accordionValue, setAccordionValue] = useState('');
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const handleNumberChange = (value: number | null) => {
    if (value !== null) {
      setNumberValue(value);
    }
  };

  const handleSliderChange = (value: number | readonly number[]) => {
    if (Array.isArray(value)) {
      setSliderValue(value as number[]);
    } else {
      setSliderValue([value]);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>@rs/design Component Library</h1>
        <p>Comprehensive showcase of Base UI components with custom styling</p>
      </header>

      {/* Core Input Components */}
      <section className="section">
        <h2>Core Input Components</h2>
        <div className="component-grid">
          
          <div className="component-demo">
            <h3>Button</h3>
            <div className="demo-content inline-demo">
              <Button.default>Default Button</Button.default>
              <Button.default disabled>Disabled Button</Button.default>
            </div>
            <div className="demo-description">
              Basic button component with hover and focus states.
            </div>
          </div>

          <div className="component-demo">
            <h3>Input</h3>
            <div className="demo-content block-demo">
              <Input.Input placeholder="Enter text..." />
              <Input.Input placeholder="Disabled input" disabled />
            </div>
            <div className="demo-description">
              Text input with placeholder and disabled states.
            </div>
          </div>

          <div className="component-demo">
            <h3>Select</h3>
            <div className="demo-content">
              <Select.Root value={selectValue} onValueChange={(value) => setSelectValue(value as string)}>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner>
                    <Select.Popup>
                      <Select.Item value="option1">
                        <Select.ItemText>Option 1</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                      <Select.Item value="option2">
                        <Select.ItemText>Option 2</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                      <Select.Item value="option3">
                        <Select.ItemText>Option 3</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    </Select.Popup>
                  </Select.Positioner>
                </Select.Portal>
              </Select.Root>
            </div>
            <div className="demo-description">
              Dropdown select with portal rendering for proper layering.
            </div>
          </div>

          <div className="component-demo">
            <h3>NumberField</h3>
            <div className="demo-content">
              <NumberField.Root value={numberValue} onValueChange={handleNumberChange}>
                <NumberField.Input />
                <NumberField.Increment />
                <NumberField.Decrement />
              </NumberField.Root>
            </div>
            <div className="demo-description">
              Number input with increment/decrement buttons.
            </div>
          </div>

        </div>
      </section>

      {/* Toggle Components */}
      <section className="section">
        <h2>Toggle & Selection Components</h2>
        <div className="component-grid">

          <div className="component-demo">
            <h3>Checkbox</h3>
            <div className="demo-content block-demo">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Checkbox.Root checked={checkboxChecked} onCheckedChange={setCheckboxChecked}>
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span>Accept terms and conditions</span>
              </div>
            </div>
            <div className="demo-description">
              Checkbox with custom indicator styling.
            </div>
          </div>

          <div className="component-demo">
            <h3>Switch</h3>
            <div className="demo-content inline-demo">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Switch.Root checked={switchChecked} onCheckedChange={setSwitchChecked}>
                  <Switch.Thumb />
                </Switch.Root>
                <span>Enable notifications</span>
              </div>
            </div>
            <div className="demo-description">
              Toggle switch with smooth thumb animation.
            </div>
          </div>

          <div className="component-demo">
            <h3>Toggle</h3>
            <div className="demo-content inline-demo">
              <Toggle.Root pressed={toggleValue} onPressedChange={setToggleValue}>
                Toggle Me
              </Toggle.Root>
            </div>
            <div className="demo-description">
              Toggle button that maintains pressed state.
            </div>
          </div>

        </div>
      </section>

      {/* Range & Progress Components */}
      <section className="section">
        <h2>Range & Progress Components</h2>
        <div className="component-grid">

          <div className="component-demo">
            <h3>Slider</h3>
            <div className="demo-content">
              <Slider.Root value={sliderValue} onValueChange={handleSliderChange} min={0} max={100}>
                <Slider.Track>
                  <Slider.Indicator />
                </Slider.Track>
                <Slider.Thumb />
              </Slider.Root>
              <p>Value: {sliderValue[0]}</p>
            </div>
            <div className="demo-description">
              Range slider with visual feedback.
            </div>
          </div>

          <div className="component-demo">
            <h3>Progress</h3>
            <div className="demo-content">
              <Progress.Root value={progressValue} max={100}>
                <Progress.Indicator style={{ width: `${progressValue}%` }} />
              </Progress.Root>
              <p>{progressValue}% complete</p>
            </div>
            <div className="demo-description">
              Progress bar showing completion status.
            </div>
          </div>

          <div className="component-demo">
            <h3>Meter</h3>
            <div className="demo-content">
              <Meter.Root value={0.7} min={0} max={1}>
                <Meter.Indicator style={{ width: '70%' }} />
              </Meter.Root>
              <p>System load: 70%</p>
            </div>
            <div className="demo-description">
              Meter for displaying scalar values within a known range.
            </div>
          </div>

        </div>
      </section>

      {/* Form Components */}
      <section className="section">
        <h2>Form Components</h2>
        <div className="component-grid">

          <div className="component-demo">
            <h3>Field</h3>
            <div className="demo-content form-demo">
              <Field.Root>
                <Field.Label>Email Address</Field.Label>
                <Field.Control>
                  <Input.Input type="email" placeholder="Enter your email" />
                </Field.Control>
                <Field.Description>We'll never share your email.</Field.Description>
              </Field.Root>
            </div>
            <div className="demo-description">
              Form field with label, control, and description.
            </div>
          </div>

        </div>
      </section>

      {/* Utility Components */}
      <section className="section">
        <h2>Utility Components</h2>
        <div className="component-grid">

          <div className="component-demo">
            <h3>Avatar</h3>
            <div className="demo-content inline-demo">
              <Avatar.Root>
                <Avatar.Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Profile" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar.Root>
              <Avatar.Root>
                <Avatar.Fallback>AB</Avatar.Fallback>
              </Avatar.Root>
            </div>
            <div className="demo-description">
              Avatar with image and fallback support.
            </div>
          </div>

          <div className="component-demo">
            <h3>Separator</h3>
            <div className="demo-content">
              <div>Content above</div>
              <hr style={{ margin: '1rem 0', border: '1px solid #ccc' }} />
              <div>Content below</div>
            </div>
            <div className="demo-description">
              Visual separator between content sections.
            </div>
          </div>

          <div className="component-demo">
            <h3>ConditionalWrap</h3>
            <div className="demo-content">
              <ConditionalWrap.default
                condition={true}
                wrap={(children: React.ReactNode) => <div style={{ padding: '1rem', background: '#e3f2fd' }}>{children}</div>}
              >
                <p>This content is conditionally wrapped.</p>
              </ConditionalWrap.default>
            </div>
            <div className="demo-description">
              Utility for conditionally wrapping components.
            </div>
          </div>

        </div>
      </section>

      {/* Installation & Usage */}
      <section className="section">
        <h2>Installation & Usage</h2>
        <div style={{ maxWidth: '800px' }}>
          <p>Install the design system in your project:</p>
          <pre style={{ background: '#f1f3f4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
            <code>pnpm add @rs/design</code>
          </pre>
          
          <p>Import components in your React application:</p>
          <pre style={{ background: '#f1f3f4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
            <code>{`import { Button, Input, Dialog } from '@rs/design';

function MyComponent() {
  return (
    <div>
      <Button.default>Click me</Button.default>
      <Input.Input placeholder="Enter text" />
    </div>
  );
}`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}

export default App;
