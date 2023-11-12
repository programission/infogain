import { useCallback, useMemo, useState } from "react";
import { ActionTypes } from "../services/api/constants";
import { useFetch } from "../services/api/hooks";
import { TransactionsComponent } from "./Transactions.component";
import { useGetPointsCollection } from "./Transactions.hooks";

export const Transactions = () => {
  const [spentParams, setSpentParams] = useState();

  const { data: usersData, status: usersStatus } = useFetch("users");

  const { data: spentData, status: spentStatus } = useFetch(
    "spent",
    spentParams
  );

  const { data: periodsData, status: periodsStatus } = useFetch("periods");

  const periodsCollection = useMemo(
    () =>
      (periodsData || []).reduce((acc, item, index, arr) => {
        if (index % 3 === 0 && index !== arr.length - 1) {
          acc.push({
            id: `${item.id}-${arr[index + 2].id}`,
            name: `${item.name} - ${arr[index + 2].name}`,
          });
        }

        return acc;
      }, []),
    [periodsData]
  );

  const usersCollection = useMemo(
    () =>
      (usersData || []).map((user) => ({
        name: `${user.name} ${user.surname}`,
        id: user.id,
      })),
    [usersData]
  );

  const pointsCollection = useGetPointsCollection(usersData, spentData);

  const tableHeaderCollection = useMemo(() => {
    return (periodsData || []).filter(
      (period) =>
        spentParams &&
        spentParams.from !== undefined &&
        period.id >= spentParams.from &&
        spentParams.to !== undefined &&
        period.id <= spentParams.to
    );
  }, [periodsData, spentParams]);

  const handlePeriodChange = useCallback((e, v) => {
    const splitted = e.target.value.split("-");

    if (splitted.length === 2) {
      setSpentParams((prev) => ({
        from: +splitted[0],
        to: +splitted[1],
        userId: prev && prev.userId,
      }));
    } else {
      setSpentParams(undefined);
    }
  }, []);

  const handleUserChange = useCallback((e, v) => {
    setSpentParams((prev) => ({
      userId: e.target.value ? +e.target.value : undefined,
      from: prev && prev.from,
      to: prev && prev.to,
    }));
  }, []);

  return (
    <TransactionsComponent
      pointsCollection={pointsCollection}
      periodsCollection={periodsCollection}
      usersCollection={usersCollection}
      busy={[usersStatus, spentStatus, periodsStatus].includes(
        ActionTypes.PENDING
      )}
      onPeriodChange={handlePeriodChange}
      onUserChange={handleUserChange}
      tableHeaderCollection={tableHeaderCollection}
    />
  );
};
