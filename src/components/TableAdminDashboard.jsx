import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';


function Items({ currentItems }) {
  return (
    <>
      <table className="min-w-full">
        <thead className="bg-white border-b">
          <tr>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              No
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Nama
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              NIK
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Alamat
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.nama_lengkap}
                </td>
                <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.nik}
                </td>
                <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.alamat}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

function TableAdminDashboard({ itemsPerPage, items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className='flex flex-col'>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="flex py-2.5 justify-center items-center gap-x-2"
          previousClassName="bg-violet-700 rounded p-2 text-xs text-white"
          pageLinkClassName=" text-xs w-full p-3"
          nextClassName="bg-violet-700 rounded p-2 text-xs text-white"
          activeClassName="bg-blue-800 text-white rounded p-1"
        />
      </div>

    </>
  );
}

export default TableAdminDashboard 