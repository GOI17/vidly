import React from "react";
import TableHeader from "../common/tableHeader";

const Table = ({ columns, sortColumn, onRender, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <tbody>{onRender(data)}</tbody>
    </table>
  );
};

export default Table;
