import { render ,screen } from "@testing-library/react";
import HealthPage from "./HealthPage";


// Mock the context
jest.mock("../context/HealthContext", () => ({
  useHealth: () => ({
    entries: [],
    saveEntry: jest.fn()
    })
}));  

// Mock HealthChat component (optional but clean)

jest.mock("../components/HealthChat", () => () => (
  <div>Mocked HealthChat</div>
));

test("renders Health Tracker heading", () => {
  render(<HealthPage />);

  expect(screen.getByText("Health Tracker")).toBeInTheDocument();
});

test("renders HealthChat component", () => {
  render(<HealthPage />);

  expect(screen.getByText("Mocked HealthChat")).toBeInTheDocument();
});