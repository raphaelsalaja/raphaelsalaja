"use client";

import { useState } from 'react';
import Button from '@rs/design/button';
// import { Input } from '@rs/design/input';
import * as Select from '@rs/design/select';
import * as Checkbox from '@rs/design/checkbox';
// import * as Radio from '@rs/design/radio';
// import * as Switch from '@rs/design/switch';
import * as Slider from '@rs/design/slider';
import * as Progress from '@rs/design/progress';
import * as Meter from '@rs/design/meter';
import * as Separator from '@rs/design/separator';
import * as Tabs from '@rs/design/tabs';
import * as Menu from '@rs/design/menu';
import * as Breadcrumb from '@rs/design/breadcrumb';
import * as Accordion from '@rs/design/accordion';
import * as Collapsible from '@rs/design/collapsible';
import * as Dialog from '@rs/design/dialog';
import * as AlertDialog from '@rs/design/alert-dialog';
import * as Popover from '@rs/design/popover';
import * as Tooltip from '@rs/design/tooltip';
import * as Field from '@rs/design/field';
import * as Fieldset from '@rs/design/fieldset';
// import * as NumberField from '@rs/design/number-field';
// import * as RadioGroup from '@rs/design/radio-group';
import * as CheckboxGroup from '@rs/design/checkbox-group';
import * as Avatar from '@rs/design/avatar';
import * as ScrollArea from '@rs/design/scroll-area';
import * as Toggle from '@rs/design/toggle';
import ConditionalWrap from '@rs/design/conditional-wrap';

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
  const [accordionValue, setAccordionValue] = useState<string[]>(['']);
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
              <Button>Default Button</Button>
              <Button disabled>Disabled Button</Button>
            </div>
            <div className="demo-description">
              Basic button component with hover and focus states.
            </div>
          </div>

          <div className="component-demo">
            <h3>Input</h3>
            <div className="demo-content block-demo">
              {/* <Input placeholder="Enter text..." />
              <Input placeholder="Disabled input" disabled /> */}
              <p>Input components temporarily commented out</p>
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
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner>
                    <Select.Popup>
                      <Select.Item value="option1">Option 1</Select.Item>
                      <Select.Item value="option2">Option 2</Select.Item>
                      <Select.Item value="option3">Option 3</Select.Item>
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
              {/* <NumberField.Root value={numberValue} onValueChange={(value) => setNumberValue(value || 0)}>
                <NumberField.Input />
                <NumberField.Increment />
                <NumberField.Decrement />
              </NumberField.Root> */}
              <p>NumberField temporarily commented out</p>
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
              {/* <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Checkbox.Root checked={checkboxChecked} onCheckedChange={setCheckboxChecked}>
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span>Accept terms and conditions</span>
              </div> */}
              <p>Checkbox temporarily commented out</p>
            </div>
            <div className="demo-description">
              Checkbox with custom indicator styling.
            </div>
          </div>

          <div className="component-demo">
            <h3>Radio</h3>
            <div className="demo-content block-demo">
              {/* <RadioGroup.Root value={radioValue} onValueChange={(value) => setRadioValue(value as string)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Radio.Root value="option1">
                      <Radio.Indicator />
                    </Radio.Root>
                    <span>Option 1</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Radio.Root value="option2">
                      <Radio.Indicator />
                    </Radio.Root>
                    <span>Option 2</span>
                  </div>
                </div>
              </RadioGroup.Root> */}
              <p>Radio group temporarily commented out</p>
            </div>
            <div className="demo-description">
              Radio group with custom indicators.
            </div>
          </div>

          <div className="component-demo">
            <h3>Switch</h3>
            <div className="demo-content inline-demo">
              {/* <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Switch.Root checked={switchChecked} onCheckedChange={setSwitchChecked}>
                  <Switch.Thumb />
                </Switch.Root>
                <span>Enable notifications</span>
              </div> */}
              <p>Switch temporarily commented out</p>
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
              <Slider.Root value={sliderValue} onValueChange={(value) => setSliderValue(Array.isArray(value) ? value : [value])} min={0} max={100}>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Indicator />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Control>
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
                  Open Menu
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <Menu.Item>New File</Menu.Item>
                      <Menu.Item>Open File</Menu.Item>
                      <Menu.Separator />
                      <Menu.Item>Exit</Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
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
              <Breadcrumb.Breadcrumb>
                <Breadcrumb.BreadcrumbItem>
                  <Breadcrumb.BreadcrumbLink href="/">Home</Breadcrumb.BreadcrumbLink>
                </Breadcrumb.BreadcrumbItem>
                <Breadcrumb.BreadcrumbSeparator />
                <Breadcrumb.BreadcrumbItem>
                  <Breadcrumb.BreadcrumbLink href="/products">Products</Breadcrumb.BreadcrumbLink>
                </Breadcrumb.BreadcrumbItem>
                <Breadcrumb.BreadcrumbSeparator />
                <Breadcrumb.BreadcrumbItem>
                  <Breadcrumb.BreadcrumbPage>Current Page</Breadcrumb.BreadcrumbPage>
                </Breadcrumb.BreadcrumbItem>
              </Breadcrumb.Breadcrumb>
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
              <Accordion.Accordion value={accordionValue} onValueChange={setAccordionValue}>
                <Accordion.AccordionItem value="item1">
                  <Accordion.AccordionHeader>
                    <Accordion.AccordionTrigger>What is React?</Accordion.AccordionTrigger>
                  </Accordion.AccordionHeader>
                  <Accordion.AccordionPanel>
                    React is a JavaScript library for building user interfaces.
                  </Accordion.AccordionPanel>
                </Accordion.AccordionItem>
                <Accordion.AccordionItem value="item2">
                  <Accordion.AccordionHeader>
                    <Accordion.AccordionTrigger>What is Base UI?</Accordion.AccordionTrigger>
                  </Accordion.AccordionHeader>
                  <Accordion.AccordionPanel>
                    Base UI is a library of headless React components.
                  </Accordion.AccordionPanel>
                </Accordion.AccordionItem>
              </Accordion.Accordion>
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
                  Toggle Content
                </Collapsible.Trigger>
                <Collapsible.Panel>
                  <div style={{ padding: '1rem', background: '#f8f9fa', marginTop: '0.5rem' }}>
                    This content can be collapsed and expanded.
                  </div>
                </Collapsible.Panel>
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
                  Open Dialog
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Backdrop />
                  <Dialog.Popup>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                    <Dialog.Description>
                      This is a modal dialog with backdrop.
                    </Dialog.Description>
                    <div style={{ marginTop: '1rem' }}>
                      <Button onClick={() => setDialogOpen(false)}>Close</Button>
                    </div>
                  </Dialog.Popup>
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
                  Open Alert
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Backdrop />
                  <AlertDialog.Popup>
                    <AlertDialog.Title>Confirm Action</AlertDialog.Title>
                    <AlertDialog.Description>
                      Are you sure you want to continue?
                    </AlertDialog.Description>
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                      <Button onClick={() => setAlertDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => setAlertDialogOpen(false)}>Confirm</Button>
                    </div>
                  </AlertDialog.Popup>
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
                  Open Popover
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Positioner>
                    <Popover.Popup>
                      <div style={{ padding: '1rem' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0' }}>Popover Content</h4>
                        <p style={{ margin: 0 }}>This is popover content.</p>
                      </div>
                    </Popover.Popup>
                  </Popover.Positioner>
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
                  Hover me
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Positioner>
                    <Tooltip.Popup>
                      This is a tooltip
                    </Tooltip.Popup>
                  </Tooltip.Positioner>
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

          {/* <div className="component-demo">
            <h3>Field</h3>
            <div className="demo-content form-demo">
              <Field.Root>
                <Field.Label>Email Address</Field.Label>
                <Field.Control>
                  <p>Input temporarily commented out</p>
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
              <Fieldset.FieldsetRoot>
                <Fieldset.FieldsetLegend>Personal Information</Fieldset.FieldsetLegend>
                <Field.Root>
                  <Field.Label>First Name</Field.Label>
                  <Field.Control>
                    <p>Input temporarily commented out</p>
                  </Field.Control>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Last Name</Field.Label>
                  <Field.Control>
                    <p>Input temporarily commented out</p>
                  </Field.Control>
                </Field.Root>
              </Fieldset.FieldsetRoot>
            </div>
            <div className="demo-description">
              Fieldset for grouping related form fields.
            </div>
          </div> */}

          <div className="component-demo">
            <h3>CheckboxGroup</h3>
            <div className="demo-content">
              <CheckboxGroup.Root>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Checkbox.Root>
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                  <span>React</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Checkbox.Root>
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                  <span>Vue</span>
                </div>
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
              <Separator.Separator />
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
                wrap={(children: React.ReactNode) => <div style={{ padding: '1rem', background: '#e3f2fd' }}>{children}</div>}
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
        </div>
      </section>
    </div>
  );
}
