import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';


function Items({ currentItems, openModal }) {
  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              No
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Tanggal
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Nama
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Status
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Bukti Pengaduan
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.tanggal}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.nama}
                </td>
                <td className="text-sm font-semibold text-white font-light whitespace-nowrap">
                  <span className={`${item.status === 'diterima' ? 'bg-green-500' : 'bg-blue-500'} text-center rounded-full px-3 py-2 capitalize`}>
                    {item.status}
                  </span>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <a
                    href={item.file_url}
                    target="_blank"
                    className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Lihat
                  </a>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-x-2">
                    <button onClick={() => openModal(item._id)} className="rounded-md bg-yellow-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
                      Detail
                    </button>
                    <button className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table >

    </>
  );
}

function TableDataPengaduan({ itemsPerPage, items, openModal }) {
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
        <Items currentItems={currentItems} openModal={openModal} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="flex py-2.5 justify-center items-center gap-x-2"
          previousClassName="bg-violet-700 rounded p-2 text-sm text-white"
          pageLinkClassName=" text-sm w-full p-3"
          nextClassName="bg-violet-700 rounded p-2 text-sm text-white"
          activeClassName="bg-blue-800 text-white rounded p-1"
        />
      </div>

    </>
  );
}

export default TableDataPengaduan 