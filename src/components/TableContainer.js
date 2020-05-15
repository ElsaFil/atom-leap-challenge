import React from "react";

export default function TableContainer(props) {
  return (
    <div className="table-container" data-testid="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Location</th>
            <th>Funding Amount</th>
            <th>Announced Date</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((obj) => {
            return (
              <tr key={obj.id}>
                <td>{obj.id}</td>
                <td>{obj.category}</td>
                <td>{obj.location}</td>
                <td>{obj.fundingAmount}</td>
                <td>{obj.announcedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
