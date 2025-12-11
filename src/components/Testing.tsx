import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Badge,
  Switch,
  Checkbox,
  Alert,
  Progress,
} from "interface-ui-lib";
import "interface-ui-lib/style.css";
import "./Testing.css";

function Testing() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  return (
    <>
      <div>
        <h1>Interface UI Library Demo</h1>
        <p>Welcome to the interface-ui-lib component showcase</p>
      </div>

      <div className="bento-grid">
        {/* Buttons */}
        <Card className="bento-card">
          <h2>Buttons</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button
              variant="primary"
              onClick={() => setCount((count) => count + 1)}
            >
              Count: {count}
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="primary">Secondary</Button>
          </div>
        </Card>

        {/* Input */}
        <Card className="bento-card">
          <h2>Input</h2>
          <Input
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p style={{ marginTop: "0.5rem", color: "#666" }}>
            Value: {inputValue || "(empty)"}
          </p>
        </Card>

        {/* Badges */}
        <Card className="bento-card">
          <h2>Badges</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </Card>

        {/* Switch & Checkbox */}
        <Card className="bento-card">
          <h2>Controls</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Switch
                checked={switchChecked}
                onChange={(e) => setSwitchChecked(e.target.checked)}
              />
              <label>Toggle Switch: {switchChecked ? "ON" : "OFF"}</label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Checkbox
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <label>
                Checkbox: {checkboxChecked ? "Checked" : "Unchecked"}
              </label>
            </div>
          </div>
        </Card>

        {/* Alert */}
        <Card className="bento-card">
          <h2>Alert</h2>
          <Alert variant="info">
            This is an informational alert message from interface-ui-lib!
          </Alert>
        </Card>

        {/* Progress */}
        <Card className="bento-card">
          <h2>Progress</h2>
          <Progress value={count * 10} max={100} />
          <p style={{ marginTop: "0.5rem", color: "#666" }}>
            Progress: {count * 10}%
          </p>
        </Card>
      </div>
    </>
  );
}

export default Testing;
