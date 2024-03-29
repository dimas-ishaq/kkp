import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';


function Items({ currentItems, handleEdit, handleDelete }) {
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
              Jenis Kelamin
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Tempat Lahir
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Tanggal Lahir
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Dusun
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Alamat
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Pekerjaan
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Pendidikan Terakhir
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Status Pernikahan
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.nama}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.jenis_kelamin}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.tempat_lahir}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.tanggal_lahir}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.dusun}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.alamat}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.pekerjaan}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.pendidikan_terakhir}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.status_pernikahan}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-x-2">
                    <button onClick={() => handleEdit(item._id)} className=" p-1 rounded-md bg-yellow-500 hover:bg-yellow-700 text-white font-bold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item._id)} className=" p-1 rounded-md bg-red-500 hover:bg-red-700 text-white font-bold">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

function TableKelolaPenduduk({ itemsPerPage, items, handleEdit, handleDelete }) {
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
        <Items currentItems={currentItems} handleEdit={handleEdit} handleDelete={handleDelete} />
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

export default TableKelolaPenduduk 