import React from 'react'

const Article = () => {
  return (
    <div id="artikel" className="flex flex-col max-w-full h-full pt-20 pb-10 md:px-24 p-10 ">
      <div className="flex flex-col">
        <span className="rounded-full text-sm static font-medium text-indigo-500 bg-indigo-50 px-3 py-2 w-28 text-center shadow">Berita Desa</span>
        <div className="flex flex-col gap-y-2 py-8">
          <h3 className="text-3xl text-gray-950 font-semibold">Artikel Terbaru</h3>
          <div className="flex md:flex-row flex-col justify-between w-full gap-y-3">
            <p className="text-sm text-gray-500 md:w-6/12">Ini merupakan berita terlengkap dan terbaru mengenai  desa
              pandanwangi mengenai program atau sumber daya alam</p>
            <p><a href="" className="text-indigo-800 hover:text-indigo-400 hover:border-b text-xs">Lihat Semua</a></p>
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto overflow-y-hidden scroll-smooth" style={{ scrollbarWidth: 'thin', ':WebkitScrollbar': { display: 'none' } }}>
        <div className="flex space-x-4">
          <div className="flex flex-col w-64 gap-y-3 py-5 ">
            <img src="/images/artikel1.png" alt="artikel" />
            <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Pertanian</span> 1 Januari 2023</p>
            <div className="flex flex-col gap-y-2">
              <h4 className="text-lg font-semibold text-gray-800 leading-tight drop-shadow-sm">Jumlah hasil pertanian padi meningkat</h4>
              <p className="text-xs font-light text-gray-600">Hampir 3 bulan lebih hujan terjadi
                di desa pandanwangi tentunya
                ini dimanfaatkan banyak petani
                untuk menanam padi di sawah....</p>
            </div>
          </div>
          <div className="flex flex-col w-64 gap-y-3 py-5">
            <img src="/images/artikel2.png" alt="artikel" />
            <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Lingkungan</span> 4 Februari 2023</p>
            <div className="flex flex-col gap-y-2">
              <h4 className="text-lg font-semibold text-gray-800 leading-tight drop-shadow-sm">Penemuan harta karun dirumah warga</h4>
              <p className="text-xs font-light text-gray-600">Kemarin tanggal 2 februari sore
                warga desa pandanwangi dikagetkan dengan penemuan
                harta karun di kebon....</p>
            </div>
          </div>
          <div className="flex flex-col w-64 gap-y-3 py-5">
            <img src="/images/artikel3.png" alt="artikel" />
            <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Ekonomi</span> 11 Maret 2023</p>
            <div className="flex flex-col gap-y-2">
              <h4 className="text-lg font-semibold text-gray-800 leading-tight drop-shadow-sm">Hama terus merugikan
                warga saat bertani</h4>
              <p className="text-xs font-light text-gray-600">Saat setiap musim padi di desa
                Pandanwangi masalah yang sering
                muncul yaitu hama yang
                banyak ditemui....</p>
            </div>
          </div>
          <div className="flex flex-col w-64 gap-y-3 py-5">
            <img src="/images/artikel4.png" alt="artikel" />
            <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Pertanian</span> 11 Januari 2023</p>
            <div className="flex flex-col gap-y-2">
              <h4 className="text-lg font-semibold text-gray-800 leading-tight drop-shadow-sm">Pendapatan dari padi
                terus meningkat</h4>
              <p className="text-xs font-light text-gray-600">Sudah setahun 2023 ini ekonomi
                desa meningkat hasil dari padi
                yang djual ke kota dan selain itu
                dari perkebunan juga....</p>
            </div>
          </div>
          <div className="flex flex-col w-64 gap-y-3 py-5">
            <img src="/images/artikel1.png" className="" alt="artikel" />
            <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Pertanian</span> 1 Januari 2023</p>
            <div className="flex flex-col gap-y-2">
              <h4 className="text-lg font-semibold text-gray-800 leading-tight drop-shadow-sm">Jumlah hasil pertanian padi meningkat</h4>
              <p className="text-xs font-light text-gray-600">Saat setiap musim padi di desa
                pendawangan masalah yang sering
                muncul yaitu hama yang
                banyak ditemui....</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article