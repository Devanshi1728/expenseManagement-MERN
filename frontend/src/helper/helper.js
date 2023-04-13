import _ from "lodash";

export const getTotal = (transactionData, type) => {
  let sum = _(transactionData)
    .groupBy("type")
    .map((obj, index) => {
      if (!type) return _.sumBy(obj, "amount");
      return {
        type: index,
        color: obj[0]?.color,
        total: _.sumBy(obj, "amount"),
      };
    })
    .value();
  return sum;
};

export const getLabels = (transaction, type) => {
  let totalAmount = getTotal(transaction, type);
  let total = _.sum(getTotal(transaction));

  let percent = _(totalAmount)
    .map((obj) => _.assign(obj, { percent: (100 * obj?.total) / total }))
    .value();
  return percent;
};

export const chartData = (transaction, custom) => {
  let dataValue = getTotal(transaction);
  let bg = _.map(transaction, (a) => a.color);
  bg = _.uniq(bg);

  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return custom ?? config;
};

export function getSum(transaction) {
  return _.sum(getTotal(transaction));
}
