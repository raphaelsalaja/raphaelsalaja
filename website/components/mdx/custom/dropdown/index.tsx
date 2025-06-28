import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Menu from "@rs/design/menu";

export const Dropdown: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Menu.Root>
        <Menu.Trigger style={{ width: "200px" }}>
          Raphael Salaja
          <Menu.TriggerIndicator>
            <ChevronDownIcon />
          </Menu.TriggerIndicator>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8} align="start">
            <Menu.Popup>
              <Menu.Group>
                <Menu.GroupLabel>Profile</Menu.GroupLabel>
                <Menu.Item>Account</Menu.Item>
                <Menu.Item>Settings</Menu.Item>
                <Menu.Item>Privacy</Menu.Item>
              </Menu.Group>

              <Menu.Separator />

              <Menu.Group>
                <Menu.GroupLabel>Support</Menu.GroupLabel>
                <Menu.Item>Contact Us</Menu.Item>
                <Menu.Item>Help Center</Menu.Item>
              </Menu.Group>
              <Menu.Separator />

              <Menu.Group>
                <Menu.Item tone="danger">Logout</Menu.Item>
              </Menu.Group>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
};
