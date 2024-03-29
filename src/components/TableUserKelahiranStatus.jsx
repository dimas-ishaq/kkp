
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';


function Items({ currentItems, handleTarget, handleInfo }) {
  return (
    <>
      <table className="min-w-full">
        <thead className="bg-white border-b">
          <tr>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              No
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              Nama Anak
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              Tempat, Tanggal Lahir
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              Jenis Kelamin
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              Nama Ayah
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              Nama Ibu
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
              Anak Ke
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
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                  {item.nama}
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                  {item.tempat_lahir}  {item.tanggal_lahir}
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                  {item.jenis_kelamin}
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                  {item.nama_ayah}
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                  {item.nama_ibu}
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                  {item.anak_ke}
                </td>

                <td className="text-sm text-gray-900 font-light px-2 py-3  whitespace-nowrap">
                  <div className={`px-3 py-2.5 ${item.status === 'diterima' ? 'bg-green-500' : item.status === 'ditolak' ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-md capitalize font-semibold w-full  mx-auto`}>
                    {item.status}
                  </div>
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap">
                  <a className='rounded-md bg-violet-500 px-3 py-2.5 font-semibold text-white' href={item.file_url} target='_blank'>Lihat File</a>
                </td>
                <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                  {item.status === 'diterima' ? (
                    <a href={item.acc_file_url} target='_blank' className="rounded-md bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                      Unduh
                    </a>
                  ) : item.status === 'ditolak' ? (
                    <button onClick={() => handleInfo()} className="rounded-md bg-yellow-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                      Info
                    </button>
                  ) : (
                    <button onClick={() => handleTarget(item._id, 'kelahiran')} className="rounded-md bg-red-500 w-full px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                      Batalkan
                    </button>
                  )}
                </td>

              </tr>
            ))}
        </tbody>
      </table >
    </>
  );
}

function TableUserKelahiranStatus({ itemsPerPage, items, handleTarget, handleInfo }) {
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
        <Items currentItems={currentItems} handleTarget={handleTarget} handleInfo={handleInfo} />
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

export default TableUserKelahiranStatus 