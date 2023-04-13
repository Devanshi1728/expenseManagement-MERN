import moment from "moment";
const Transaction = ({ category, handler }) => {
  const { name, color, amount, date } = category;
  if (!category) return null;
  return (
    <div
      className="item flex bg-gray-50 p-3 justify-between items-center"
      style={{ borderRight: `8px solid ${color}` }}
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
        <span className="block">{name ?? ""}</span>
      </div>
      <div className="flex flex-col items-end">
        <h5 className="text-base flex ">Rs. {amount ?? ""}/-</h5>
        <span className="text-xs flex text-gray-500">
          {moment(date).format("MM-DD-YYYY") ?? ""}
        </span>
      </div>
    </div>
  );
};

export default Transaction;
