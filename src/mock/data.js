const names = [
  "John",
  "Alfred",
  "Simone",
  "Nadia",
  "Peter",
  "Robert",
  "Teresa",
];
const surnames = ["Doe", "Example", "Lorem", "Ipsum", "Dolor", "Sit", "Amet"];

const usersMock = Array.from(Array(100).keys()).map((key) => ({
  id: key,
  name: names[Math.floor(Math.random() * names.length)],
  surname: surnames[Math.floor(Math.random() * surnames.length)],
}));

const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("en-US", { month: "long" });
};

const periodsMock = Array.from(Array(12).keys()).map((key) => ({
  id: key,
  name: getMonthName(key),
}));

const spentMock = usersMock.reduce((acc, user) => {
  const lastId = acc.length ? acc[acc.length - 1].id : 0;

  const userPerMonth = periodsMock.map((period, index) => ({
    id: lastId + index,
    monthId: period.id,
    transactions: Array.from(Array(Math.floor(Math.random() * 50)).keys()).map(
      (key) => ({ id: key, amount: Math.floor(Math.random() * 200) })
    ),
    userId: user.id,
  }));

  return [...acc, ...userPerMonth];
}, []);

export const getUrl = (enpoint, params) => {
  if (enpoint === "users") {
    const usersFileMock = new Blob([JSON.stringify(usersMock)], {
      type: "application/json",
    });

    return URL.createObjectURL(usersFileMock);
  } else if (enpoint === "spent") {
    const { from, to, userId } = params || {};

    const areValidParams = typeof from === "number" && typeof to === "number";

    const filteredSpentMock = areValidParams
      ? spentMock.filter(
          (item) =>
            item.monthId >= from &&
            item.monthId <= to &&
            (typeof userId !== "number" || item.userId === userId)
        )
      : [];

    const spentFileMock = new Blob([JSON.stringify(filteredSpentMock)], {
      type: "application/json",
    });

    return URL.createObjectURL(spentFileMock);
  } else if (enpoint === "periods") {
    const periodsFileMock = new Blob([JSON.stringify(periodsMock)], {
      type: "application/json",
    });

    return URL.createObjectURL(periodsFileMock);
  }

  return "";
};
