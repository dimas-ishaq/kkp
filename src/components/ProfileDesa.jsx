import React from 'react'

const ProfileDesa = () => {
  return (
    <div id="profile-desa" className="flex flex-col w-full h-full pt-32 pb-10">
      <div className="w-full first-letter: sm:max-w-11/12 h-full sm:px-24 px-10 mx-auto">
        <div className="grid lg:grid-cols-2 lg:gap-x-5 gap-x-10 gap-y-10 w-full place-items-center">
          <div className="w-full h-auto">
            <img src="/images/pertanian.png" className="rounded-3xl shadow object-contain w-11/12 h-auto" alt="pertanian" />
          </div>
          <div className="flex flex-col lg:gap-y-8 gap-y-3 w-full h-auto">
            <span className="rounded-full text-sm static font-medium text-indigo-500 bg-indigo-50 px-3 py-2 w-28 text-center shadow">Profile Desa</span>
            <h2 className="sm:text-4xl text-2xl font-semibold text-gray-900 leading-normal">Desa Pandanwangi yang merupakan <span className="text-green-600 font-semibold">Desa Pertanian</span></h2>
            <p className="text-sm text-gray-700 leading-loose">Desa Pandanwangi terletak di Kecamatan Diwek, Kabupaten Jombang,
              Provinsi Jawa Timur. Desa ini terletak di sebelah barat laut Kota Jombang,
              berjarak sekitar 10 kilometer. Desa Pandanwangi memiliki potensi pertanian
              yang cukup besar. Tanaman pangan yang dibudidayakan di desa ini
              antara lain padi, jagung, dan ketela pohon. Selain itu, desa ini juga memiliki
              potensi perkebunan, antara lain kelapa, durian, dan mangga.</p>
            <button className="text-sm font-semibold px-3.5 py-2.5 bg-violet-600 max-w-64 hover:bg-violet-500 text-slate-50 rounded-xl text-center">Baca Selengkapnya</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDesa