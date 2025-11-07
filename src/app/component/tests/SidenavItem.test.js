import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SidenavItem from "@/app/component/navbar/SidenavItem";

jest.mock("@/app/utils/constants/iconMap", () => ({
  iconMap: {
    dashboard: "svg-mock",
  },
}));

describe("SidenavItem", () => {
  const mockItem = {
    iconKey: "dashboard",
    label: "Dashboard",
  };

  it("renders correctly with inactive state", () => {
    render(<SidenavItem item={mockItem} isActive={false} onClick={() => {}} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders with active styling when isActive is true", () => {
    const { container } = render(
      <SidenavItem item={mockItem} isActive={true} onClick={() => {}} />
    );
    expect(container.querySelector(".bg-primary")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <SidenavItem item={mockItem} isActive={false} onClick={handleClick} />
    );
    fireEvent.click(screen.getByText("Dashboard"));
    expect(handleClick).toHaveBeenCalled();
  });
});
