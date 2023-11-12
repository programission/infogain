import { render, screen, waitFor } from "@testing-library/react";
import { API } from "../services/api/api";
import { Transactions } from "./Transactions.controller";
import { TransactionsComponent } from "./Transactions.component";

const callApiSpy = jest.spyOn(API, "call");

test("should render loading img", async () => {
  render(<Transactions />);
  await waitFor(() => {
    const loadingImg = screen.getByRole("img");
    expect(loadingImg).toBeInTheDocument();
  });
});

test("check count of api calls on component run", async () => {
  render(<Transactions />);

  await waitFor(() => {
    expect(callApiSpy).toHaveBeenCalledTimes(3);
  });
});

test("show empty message when no data", async () => {
  render(
    <TransactionsComponent
      pointsCollection={[]}
      periodsCollection={[]}
      usersCollection={[]}
      busy={false}
      onPeriodChange={() => {}}
      onUserChange={() => {}}
      tableHeaderCollection={[
        {
          id: 0,
          name: "January",
        },
        {
          id: 1,
          name: "February",
        },
        {
          id: 2,
          name: "March",
        },
      ]}
    />
  );

  const emptyBox = screen.getByTestId("empty-table");
  expect(emptyBox).toHaveTextContent("Please select period");
});
