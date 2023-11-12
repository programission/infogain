import "./Transactions.styles.css";

export const TransactionsComponent = ({
  periodsCollection,
  usersCollection,
  pointsCollection,
  busy,
  onPeriodChange,
  onUserChange,
  tableHeaderCollection,
}) => {
  return (
    <div className="container">
      <div className="selectors">
        <div>
          <select name="user" id="user-select" onChange={onUserChange}>
            <option value="" key={-1}>
              Filter by user
            </option>

            {usersCollection &&
              usersCollection.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
          <select name="from" id="from-select" onChange={onPeriodChange}>
            <option value="" key={-1}>
              Filter by period
            </option>

            {periodsCollection &&
              periodsCollection.map((period) => (
                <option value={period.id} key={period.id}>
                  {period.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      {busy && (
        <div className="loader">
          <img src={"loader.gif"} alt="loader" />
        </div>
      )}
      {!busy && (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Amount</th>
                {tableHeaderCollection.map((period) => (
                  <th key={period.id}>Points {period.name}</th>
                ))}
                <th>Points Total</th>
              </tr>
            </thead>
            <tbody>
              {pointsCollection.map((points) => (
                <tr key={points.id}>
                  <td>{points.user}</td>
                  <td>{points.totalAmount} $</td>

                  <td>
                    {points.pointsPerMonth &&
                      tableHeaderCollection[0] &&
                      points.pointsPerMonth[tableHeaderCollection[0].id]}
                  </td>
                  <td>
                    {points.pointsPerMonth &&
                      tableHeaderCollection[1] &&
                      points.pointsPerMonth[tableHeaderCollection[1].id]}
                  </td>

                  <td>
                    {points.pointsPerMonth &&
                      tableHeaderCollection[2] &&
                      points.pointsPerMonth[tableHeaderCollection[2].id]}
                  </td>
                  <td>{points.pointsTotal}</td>
                </tr>
              ))}

              {!pointsCollection ||
                (!pointsCollection.length && (
                  <tr>
                    <td
                      colSpan={6}
                      className="emptyTable"
                      data-testid="empty-table"
                    >
                      Please select period
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
