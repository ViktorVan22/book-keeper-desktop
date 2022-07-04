import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "../../components/provider/Provider";
import DetailPage from "./DetailPage";

describe("DetailPage component test", () => {
  test("should display expected layout when render the DetailPage component", () => {
    // 在render时，为了保证DetailPage组件能正确接收context，需要为它在外面包一层Provider
    const { container } = render(
      <Provider>
        <DetailPage />
      </Provider>
    );
    const content = container.querySelector(".detail-page-content");
    expect(content?.childElementCount).toEqual(0);
  });

  test("should open RecordModal when click create new button", () => {
    render(
      <Provider>
        <DetailPage />
      </Provider>
    );

    // Modal组件是被挂载在body上的
    expect(document.body.querySelector(".ant-modal-root")).toBeNull();

    userEvent.click(screen.getByRole("button"));
    expect(document.body.querySelector(".ant-modal-root")).toBeInTheDocument();
  });
});
