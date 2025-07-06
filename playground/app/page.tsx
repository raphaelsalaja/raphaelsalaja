"use client";

import { useState } from 'react';
import {
  // Core Components
  Button,
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Progress,
  Meter,
  Separator,
  
  // Navigation
  Tabs,
  Menu,
  Breadcrumb,
  
  // Layout
  Accordion,
  Collapsible,
  Dialog,
  AlertDialog,
  Popover,
  Tooltip,
  
  // Form Components
  Field,
  Fieldset,
  NumberField,
  CheckboxGroup,
  
  // Utility
  Avatar,
  ScrollArea,
  Toggle,
  
  // Hooks and Utilities
  ConditionalWrap
} from '@rs/design';

export default function PlaygroundPage() {
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

  return (
    <div className="container">
      <header className="header">
        <h1>@rs/design Component Library</h1>
        <p>Comprehensive showcase of all Base UI components with custom styling</p>
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
              <Input placeholder="Enter text..." />
              <Input placeholder="Disabled input" disabled />
            </div>
            <div className="demo-description">
              Text input with placeholder and disabled states.
            </div>
          </div>

          <div className="component-demo">
            <h3>Select</h3>
            <div className="demo-content">
              <Select.Root value={selectValue} onValueChange={setSelectValue}>
                <Select.Trigger>
                  <Select.Value placeholder="Choose option..." />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content>
                    <Select.Item value="option1">Option 1</Select.Item>
                    <Select.Item value="option2">Option 2</Select.Item>
                    <Select.Item value="option3">Option 3</Select.Item>
                  </Select.Content>
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
              <NumberField.Root value={numberValue} onValueChange={setNumberValue}>
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
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Checkbox.Root checked={checkboxChecked} onCheckedChange={setCheckboxChecked}>
                  <Checkbox.Indicator />
                </Checkbox.Root>
                Accept terms and conditions
              </label>
            </div>
            <div className="demo-description">
              Checkbox with custom indicator styling.
            </div>
          </div>

          <div className="component-demo">
            <h3>Radio</h3>
            <div className="demo-content block-demo">
              <Radio.Root value={radioValue} onValueChange={setRadioValue}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Radio.Item value="option1">
                    <Radio.Indicator />
                    Option 1
                  </Radio.Item>
                  <Radio.Item value="option2">
                    <Radio.Indicator />
                    Option 2
                  </Radio.Item>
                </div>
              </Radio.Root>
            </div>
            <div className="demo-description">
              Radio group with custom indicators.
            </div>
          </div>

          <div className="component-demo">
            <h3>Switch</h3>
            <div className="demo-content inline-demo">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Switch.Root checked={switchChecked} onCheckedChange={setSwitchChecked}>
                  <Switch.Thumb />
                </Switch.Root>
                Enable notifications
              </label>
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
              <Slider.Root value={sliderValue} onValueChange={setSliderValue} min={0} max={100}>
                <Slider.Track>
                  <Slider.Range />
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

      {/* Navigation Components */}
      <section className="section">
        <h2>Navigation Components</h2>
        <div className="component-grid">

          <div className="component-demo">
            <h3>Tabs</h3>
            <div className="demo-content">
              <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
                  <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
                  <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="tab1">Content for Tab 1</Tabs.Panel>
                <Tabs.Panel value="tab2">Content for Tab 2</Tabs.Panel>
                <Tabs.Panel value="tab3">Content for Tab 3</Tabs.Panel>
              </Tabs.Root>
            </div>
            <div className="demo-description">
              Tabbed interface with smooth transitions.
            </div>
          </div>

          <div className="component-demo">
            <h3>Menu</h3>
            <div className="demo-content">
              <Menu.Root>
                <Menu.Trigger>
                  <Button.default>Open Menu</Button.default>
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Content>
                    <Menu.Item>New File</Menu.Item>
                    <Menu.Item>Open File</Menu.Item>
                    <Menu.Separator />
                    <Menu.Item>Exit</Menu.Item>
                  </Menu.Content>
                </Menu.Portal>
              </Menu.Root>
            </div>
            <div className="demo-description">
              Dropdown menu with keyboard navigation.
            </div>
          </div>

          <div className="component-demo">
            <h3>Breadcrumb</h3>
            <div className="demo-content">
              <Breadcrumb.Root>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Page>Current Page</Breadcrumb.Page>
                </Breadcrumb.Item>
              </Breadcrumb.Root>
            </div>
            <div className="demo-description">
              Breadcrumb navigation showing page hierarchy.
            </div>
          </div>

        </div>
      </section>

      {/* Layout Components */}
      <section className="section">
        <h2>Layout & Container Components</h2>
        <div className="component-grid">

          <div className="component-demo">
            <h3>Accordion</h3>
            <div className="demo-content">
              <Accordion.Root value={accordionValue} onValueChange={setAccordionValue}>
                <Accordion.Item value="item1">
                  <Accordion.Header>
                    <Accordion.Trigger>What is React?</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content>
                    React is a JavaScript library for building user interfaces.
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item2">
                  <Accordion.Header>
                    <Accordion.Trigger>What is Base UI?</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content>
                    Base UI is a library of headless React components.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>
            <div className="demo-description">
              Collapsible accordion panels with smooth animations.
            </div>
          </div>

          <div className="component-demo">
            <h3>Collapsible</h3>
            <div className="demo-content">
              <Collapsible.Root open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
                <Collapsible.Trigger>
                  <Button.default>Toggle Content</Button.default>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <div style={{ padding: '1rem', background: '#f8f9fa', marginTop: '0.5rem' }}>
                    This content can be collapsed and expanded.
                  </div>
                </Collapsible.Content>
              </Collapsible.Root>
            </div>
            <div className="demo-description">
              Simple collapsible content with trigger.
            </div>
          </div>

          <div className="component-demo">
            <h3>ScrollArea</h3>
            <div className="demo-content">
              <ScrollArea.Root style={{ height: '150px', border: '1px solid #ccc' }}>
                <ScrollArea.Viewport>
                  <div style={{ padding: '1rem' }}>
                    <p>This is a scrollable area with custom scrollbars.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
                    <p>Excepteur sint occaecat cupidatat non proident.</p>
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical">
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </div>
            <div className="demo-description">
              Custom scrollable area with styled scrollbars.
            </div>
          </div>

        </div>
      </section>

      {/* Dialog & Overlay Components */}
      <section className="section">
        <h2>Dialog & Overlay Components</h2>
        <div className="component-grid">

          <div className="component-demo">
            <h3>Dialog</h3>
            <div className="demo-content">
              <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                <Dialog.Trigger>
                  <Button.default>Open Dialog</Button.default>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Backdrop />
                  <Dialog.Content>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                    <Dialog.Description>
                      This is a modal dialog with backdrop.
                    </Dialog.Description>
                    <div style={{ marginTop: '1rem' }}>
                      <Button.default onClick={() => setDialogOpen(false)}>Close</Button.default>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
            <div className="demo-description">
              Modal dialog with backdrop and focus management.
            </div>
          </div>

          <div className="component-demo">
            <h3>AlertDialog</h3>
            <div className="demo-content">
              <AlertDialog.Root open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                <AlertDialog.Trigger>
                  <Button.default>Open Alert</Button.default>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Backdrop />
                  <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Action</AlertDialog.Title>
                    <AlertDialog.Description>
                      Are you sure you want to continue?
                    </AlertDialog.Description>
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                      <AlertDialog.Cancel>
                        <Button.default>Cancel</Button.default>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action>
                        <Button.default onClick={() => setAlertDialogOpen(false)}>Confirm</Button.default>
                      </AlertDialog.Action>
                    </div>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </div>
            <div className="demo-description">
              Alert dialog for important confirmations.
            </div>
          </div>

          <div className="component-demo">
            <h3>Popover</h3>
            <div className="demo-content">
              <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
                <Popover.Trigger>
                  <Button.default>Open Popover</Button.default>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content>
                    <div style={{ padding: '1rem' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0' }}>Popover Content</h4>
                      <p style={{ margin: 0 }}>This is popover content.</p>
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
            <div className="demo-description">
              Popover with positioning and portal rendering.
            </div>
          </div>

          <div className="component-demo">
            <h3>Tooltip</h3>
            <div className="demo-content">
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <Button.default>Hover me</Button.default>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content>
                    This is a tooltip
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
            <div className="demo-description">
              Tooltip that appears on hover with positioning.
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
                  <Input type="email" placeholder="Enter your email" />
                </Field.Control>
                <Field.Description>We&apos;ll never share your email.</Field.Description>
              </Field.Root>
            </div>
            <div className="demo-description">
              Form field with label, control, and description.
            </div>
          </div>

          <div className="component-demo">
            <h3>Fieldset</h3>
            <div className="demo-content form-demo">
              <Fieldset.Root>
                <Fieldset.Legend>Personal Information</Fieldset.Legend>
                <Field.Root>
                  <Field.Label>First Name</Field.Label>
                  <Field.Control>
                    <Input placeholder="First name" />
                  </Field.Control>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Last Name</Field.Label>
                  <Field.Control>
                    <Input placeholder="Last name" />
                  </Field.Control>
                </Field.Root>
              </Fieldset.Root>
            </div>
            <div className="demo-description">
              Fieldset for grouping related form fields.
            </div>
          </div>

          <div className="component-demo">
            <h3>CheckboxGroup</h3>
            <div className="demo-content">
              <CheckboxGroup.Root>
                <CheckboxGroup.Item value="react">
                  <Checkbox.Root>
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                  React
                </CheckboxGroup.Item>
                <CheckboxGroup.Item value="vue">
                  <Checkbox.Root>
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                  Vue
                </CheckboxGroup.Item>
              </CheckboxGroup.Root>
            </div>
            <div className="demo-description">
              Group of checkboxes with coordinated state.
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
              <Separator.Root />
              <div>Content below</div>
            </div>
            <div className="demo-description">
              Visual separator between content sections.
            </div>
          </div>

          <div className="component-demo">
            <h3>ConditionalWrap</h3>
            <div className="demo-content">
              <ConditionalWrap
                condition={true}
                wrapper={(children: React.ReactNode) => <div style={{ padding: '1rem', background: '#e3f2fd' }}>{children}</div>}
              >
                <p>This content is conditionally wrapped.</p>
              </ConditionalWrap>
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
      <Input placeholder="Enter text" />
    </div>
  );
}`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
