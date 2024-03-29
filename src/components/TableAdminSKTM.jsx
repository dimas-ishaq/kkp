import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';


function Items({ currentItems, handleValidate, handleReject }) {
  return (
    <>
      <table className="min-w-full">
        <thead className="bg-white border-b">
          <tr>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3  text-left">
              No
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3  text-left">
              Nama Pemohon
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3  text-left">
              Tempat, Tanggal Lahir
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              Jenis Kelamin
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3  text-left">
              Pekerjaan
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900  px-2 py-3 text-left">
              Alamat
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              Status
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              File Persyaratan
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                  {item.nama}
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                  {item.tempat_lahir}  {item.tanggal_lahir}
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                  {item.jenis_kelamin}
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                  {item.pekerjaan}
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                  {item.alamat}
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                  <div className={`px-3 py-2.5  ${item.status === 'diterima' ? 'bg-green-600' : item.status === 'ditolak' ? 'bg-red-600' : 'bg-blue-600'}  text-white rounded-md capitalize font-semibold w-full mx-auto`}>
                    {item.status}
                  </div>
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                  <a className='rounded-md bg-violet-500 px-3 py-2.5 font-semibold text-white' href={item.file_url} target='_blank'>Lihat File</a>
                </td>
                {item.status === "pending" ? (
                  <>
                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                      {currentItems && <button onClick={() => handleValidate(item._id, 'sktm')} className="rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Validasi
                      </button>}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                      <button onClick={() => handleReject(item._id, 'sktm')} className='rounded-md bg-red-600 px-3 py-2.5 font-semibold text-white'>Tolak</button>
                    </td>
                  </>) : item.status === 'diterima' ? (
                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                      <a href={item.acc_file_url} target='_blank' className='rounded-md bg-green-600 px-3 py-2.5 font-semibold text-white'>Lihat Surat</a>
                    </td>
                  ) : (
                  ''
                )
                }
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

function TableAdminSKTM({ itemsPerPage, items, handleValidate, handleReject }) {
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
        <Items currentItems={currentItems} handleValidate={handleValidate} handleReject={handleReject} />
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

export default TableAdminSKTM 