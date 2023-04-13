import moment from "moment";
const Transaction = ({ category, handler }) => {
  const { name, color, amount, date, type, accType } = category;
  if (!category) return null;
  return (
    <div
      className="item flex bg-gray-50 p-3 justify-between items-center"
      style={{
        borderRight: `8px solid ${color}`,
        borderBottom: `1px solid ${color}`,
      }}
    >
      <div className="flex ">
        <button className="px-3" onClick={handler}>
          <box-icon
            name="trash"
            size="15px"
            color={color}
            data-id={category._id ?? ""}
          />
        </button>
        <div className="flex flex-col">
          <span className="block">{name ?? ""}</span>
          <span className="text-xs flex text-gray-500">
            {accType ?? "Cash"}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <h5 className="text-base flex ">
          {type === "Expenses" ? "-" : ""}Rs. {amount ?? ""}/-
        </h5>
        <span className="text-xs flex text-gray-500">
          {moment(date).format("MM-DD-YYYY") ?? ""}
        </span>
      </div>
    </div>
  );
};

export default Transaction;
