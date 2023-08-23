import { useTable, useSortBy, usePagination } from "react-table";
import tw from "twin.macro";

export default function Table({ columns, data }) {
  const Table = tw.table`table-fixed text-base text-gray-900`;
  const TableHead = tw.thead`p-2`;
  const TableRow = tw.tr`border border-black`;
  const TableHeader = tw.th`border border-black p-2`;
  const TableBody = tw.tbody``;
  const TableData = tw.td`border border-black p-5`;

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
  } = tableInstance;

  const isEven = (idx) => idx % 2 === 0;
  const { pageIndex, pageSize } = state;

  return (
    <>
      <div>
        <Table className="w-full mx-auto" {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHeader
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, idx) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  className={isEven(idx) ? "bg-[#95AFD7] bg-opacity-20" : ""}
                >
                  {row.cells.map((cell, idx) => (
                    <TableData {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableData>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex flex-col items-center">
          <div className="inline-flex mt-2">
            <span className="text-sm text-gray-700">
              Page&nbsp;
              <span className="font-semibold text-gray-900">
                {pageIndex + 1}&nbsp;
              </span>
              of&nbsp;
              <span className="font-semibold text-gray-900">
                {pageOptions.length}&nbsp;
              </span>
            </span>
            <span className="text-sm text-gray-700">
              | Go to page:&nbsp;
              <input
                type="number"
                defaultValue={pageIndex + 1}
                className="w-12 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200"
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
              />
              &nbsp;
            </span>
            <span className="text-sm text-gray-700">
              |&nbsp;
              <select
                value={pageSize}
                className="text-sm text-gray-700 font-medium text-center bg-gray-100 rounded-lg hover:bg-gray-200"
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[5, 10, 25, 50].map((pageSize) => (
                  <option
                    key={pageSize}
                    value={pageSize}
                    className="text-sm text-gray-700"
                  >
                    Show {pageSize}&nbsp;
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div className="inline-flex mt-2">
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-300 rounded-l hover:bg-gray-400"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-300 hover:bg-gray-400"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-300 hover:bg-gray-400"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-300 rounded-r hover:bg-gray-400"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}