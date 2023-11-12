import { useMemo } from "react";

export const useGetPointsCollection = (usersData, spentData) =>
  useMemo(() => {
    const calculatePoints = (transactions) =>
      transactions.reduce((acc, transaction) => {
        if (transaction.amount > 50 && transaction.amount <= 100) {
          return acc + (transaction.amount - 50);
        }

        if (transaction.amount > 100) {
          return acc + 50 + (transaction.amount - 100) * 2;
        }

        return acc;
      }, 0);

    const collection = (usersData || []).reduce((acc, user) => {
      const spentByUser = spentData.filter((spent) => spent.userId === user.id);

      if (spentByUser && spentByUser.length) {
        const spentResults = spentByUser.reduce((acc, item) => {
          acc = {
            id: user.id,
            user: `${user.name} ${user.surname}`,
            totalAmount:
              (acc.totalAmount || 0) +
              item.transactions.reduce((acc, transaction) => {
                return acc + transaction.amount;
              }, 0),
            pointsTotal:
              (acc.pointsTotal || 0) + calculatePoints(item.transactions),
            pointsPerMonth: {
              ...acc.pointsPerMonth,
              [item.monthId]:
                (acc.pointsPerMonth && acc.pointsPerMonth[item.monthId]
                  ? acc.pointsPerMonth[item.monthId]
                  : 0) + calculatePoints(item.transactions),
            },
          };

          return acc;
        }, []);
        acc.push(spentResults);
      }

      return acc;
    }, []);

    return collection;
  }, [usersData, spentData]);
