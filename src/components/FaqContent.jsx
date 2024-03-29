
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const FaqContent = () => {
    return (
        <>
            <div id='faq' className="flex flex-col w-full h-auto pt-24 sm:px-24 px-10">
                <div className="flex flex-col w-full h-auto mx-auto gap-y-5">
                    <span className=' mx-auto rounded-full text-sm static font-medium text-indigo-500 bg-indigo-50 px-3 py-2 w-28 text-center shadow'>Pertanyaan</span>
                    <div className="flex flex-col md:w-6/12 mx-auto gap-y-3">
                        <h3 className="text-3xl font-semibold text-gray-800 leading-normal text-center drop-shadow-sm">Pertanyaan yang Sering Diajukan</h3>
                        <p className='text-sm font-light text-center text-gray-700'>Apapun yang anda butuhkan dan ingin mengetahui mengenai web
                            layanan desa ini anda bisa temukan jawaban yang anda cari</p>
                    </div>
                </div>
                <div className="w-full h-auto py-10">
                    <div className=" flex md:flex-row flex-col mx-auto gap-5 w-full rounded-2xl bg-white p-2">
                        <div className=" flex flex-col gap-5 w-full">
                            <Disclosure >
                                {({ close }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-50 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500/75">
                                            <span>Apa saja layanan yang tersedia ?</span>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 py-2 text-gray-700">
                                            <div className="flex flex-col gap-y-2">
                                                <h3 className='text-md font-medium'>Pelayanan Legalisasi yang tersedia meliputi :</h3>
                                                <ul>
                                                    <li className='text-sm'>a. Pelayanan Surat Keterangan Tidak Mampu</li>
                                                    <li className='text-sm'>b. Pelayanan Surat Keterangan Domisili </li>
                                                    <li className='text-sm'>c. Pelayanan Surat Keterangan Lahir </li>
                                                    <li className='text-sm'>d. Pelayanan Surat Keterangan Kematian  </li>
                                                </ul>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure >
                                {({ close }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-50 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500/75">
                                            <span>Kapan jadwal pelayanan Desa Pandanwangi mulai dibuka ?</span>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-700">
                                            <div className="flex flex-col gap-y-1">
                                                <h3 className='text-md font-medium'>Berikut adalah jadwal pelayanan umum Desa Pandanwangi:</h3>
                                                <p className="text-sm"> - Hari Senin-Jum’at : 07.30 – 16.00
                                                    (Istirahat : 12.00 – 13.00)
                                                </p>
                                                <p className="text-sm"> -
                                                    Hari Jum’at : 07.30 – 14.00
                                                    (Istirahat : 11.30 – 13.00)
                                                </p>
                                                <p className="text-sm">
                                                    Jam istirahat pelayanan tetap melayani
                                                </p>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure >
                                {({ close }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-50 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500/75">
                                            <span>Bagaimana cara mengajukan pembuatan Surat Keterangan Lahir ?</span>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-700">
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex flex-col gap-y-1">
                                                    <h3 className='text-sm font-semibold'>Anda harus menyiapkan beberapa dokumen persyaratan sebagai berikut :</h3>
                                                    <ul>
                                                        <li className='text-sm'>- Scan Akta Kelahiran yang Asli</li>
                                                        <li className='text-sm'>- Scan Kartu Keluarga (KK) atau identitas orang tua</li>
                                                        <li className='text-sm'>- Scan Surat Pengantar dari Rumah Sakit </li>
                                                        <li className='text-sm'>- Pas Foto Bayi </li>
                                                    </ul>
                                                    <p className='text-sm text-green-600'>*Note: dokumen persyaratan dijadikan satu dalam bentuk file PDF </p>
                                                </div>
                                                <div className="flex flex-col gap-y-1">
                                                    <h3 className='text-sm font-semibold'>Kemudian prosedur pembuatan Surat Keterangan Lahir antar desa adalah :</h3>
                                                    <ul>
                                                        <li className='text-sm'>1. Pemohon meng-upload berkas persyaratan</li>
                                                        <li className='text-sm'>2. Pemohon mengisi form yang sudah disediakan</li>
                                                        <li className='text-sm'>3. Petugas mengecek dan memverifikasi kelengkapan berkas</li>
                                                        <li className='text-sm'>4. Petugas mengirim Surat Keterangan Lahir </li>
                                                        <li className='text-sm'>4. Pemohon diarahkan ke menu Cek Status untuk mengecek proses permohonan, jika sudah tervalidasi maka pemohon dapat mengunduh surat yang diajukan. </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure >
                                {({ close }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-50 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500/75">
                                            <span>Bagaimana cara mengajukan pembuatan Surat Keterangan Domisili ?</span>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-700">
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex flex-col gap-y-1">
                                                    <h3 className='text-sm font-semibold'>Anda harus menyiapkan beberapa dokumen persyaratan sebagai berikut :</h3>
                                                    <ul>
                                                        <li className='text-sm'>- Scan KTP pemohon yang masih berlaku</li>
                                                        <li className='text-sm'>- Scan Surat pengantar RT/RW</li>
                                                        <li className='text-sm'>- Scan Kartu Keluarga (KK)</li>
                                                        <li className='text-sm'>- Bukti alamat atau surat pernyataan pemilik rumah</li>
                                                    </ul>
                                                    <p className='text-sm text-green-600'>*Note: dokumen persyaratan dijadikan satu dalam bentuk file PDF </p>
                                                </div>
                                                <div className="flex flex-col gap-y-1">
                                                    <h3 className='text-sm font-semibold'>Kemudian prosedur pembuatan Surat Keterangan Domisili antar desa adalah :</h3>
                                                    <ul>
                                                        <li className='text-sm'>1. Pemohon meng-upload berkas persyaratan</li>
                                                        <li className='text-sm'>2. Pemohon mengisi form yang sudah disediakan</li>
                                                        <li className='text-sm'>3. Petugas mengecek dan memverifikasi kelengkapan berkas</li>
                                                        <li className='text-sm'>4. Petugas mengirim Surat Keterangan Domisili </li>
                                                        <li className='text-sm'>5. Pemohon diarahkan ke menu Cek Status untuk mengecek proses permohonan, jika sudah tervalidasi maka pemohon dapat mengunduh surat yang diajukan. </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            <Disclosure >
                                {({ close }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-50 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500/75">
                                            <span>Bagaimana cara mengajukan pembuatan Surat Keterangan Kematian ?</span>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-700">
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex flex-col gap-y-1">
                                                    <h3 className='text-sm font-semibold'>Anda harus menyiapkan beberapa dokumen persyaratan sebagai berikut :</h3>
                                                    <ul>
                                                        <li className='text-sm'>- Scan Akta Kematian yang Asli</li>
                                                        <li className='text-sm'>- Scan KTP Almarhum/Almarhumah</li>
                                                        <li className='text-sm'>- Scan Surat Pengantar dari RT/RW</li>
                                                        <li className='text-sm'>- Scan KTP Pemohon/Keluarga </li>
                                                    </ul>
                                                    <p className='text-sm text-green-600'>*Note: dokumen persyaratan dijadikan satu dalam bentuk file PDF </p>
                                                </div>
                                                <div className="flex flex-col gap-y-1">
                                                    <h3 className='text-sm font-semibold'>Kemudian prosedur pembuatan Surat Keterangan Kematian antar desa adalah :</h3>
                                                    <ul>
                                                        <li className='text-sm'>1. Pemohon meng-upload berkas persyaratan</li>
                                                        <li className='text-sm'>2. Pemohon mengisi form yang sudah disediakan</li>
                                                        <li className='text-sm'>3. Petugas mengecek dan memverifikasi kelengkapan berkas</li>
                                                        <li className='text-sm'>4. Petugas mengirim Surat Keterangan Kematian</li>
                                                        <li className='text-sm'>5. Pemohon diarahkan ke menu Cek Status untuk mengecek proses permohonan, jika sudah tervalidasi maka pemohon dapat mengunduh surat yang diajukan. </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure >
                                {({ close }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-50 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500/75">
                                            <span>Bagaimana cara mengajukan pembuatan Surat Keterangan Tidak Mampu ? </span>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-700">
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex flex-col gap-y-1">
                                                    <h3 className='text-sm font-semibold'>Anda harus menyiapkan beberapa dokumen persyaratan sebagai berikut :</h3>
                                                    <ul>
                                                        <li className='text-sm'>- Surat permohonan yang berisi alasan dan keperluan surat keterangan tidak mampu.</li>
                                                        <li className='text-sm'>- Scan KTP pemohon yang masih berlaku.</li>
                                                        <li className='text-sm'>- Scan Kartu Keluarga (KK)</li>
                                                        <li className='text-sm'>- Bukti pendapatan atau surat keterangan penghasilan yang menunjukkan bahwa pemohon tidak mampu secara ekonomi.</li>
                                                    </ul>
                                                    <p className='text-sm text-green-600'>*Note: dokumen persyaratan dijadikan satu dalam bentuk file PDF </p>
                                                </div>
                                                <div className="flex flex-col gap-y-1">
                                                    <h3 className='text-sm font-semibold'>Kemudian prosedur pembuatan Surat Keterangan Kematian antar desa adalah :</h3>
                                                    <ul>
                                                        <li className='text-sm'>1. Pemohon meng-upload berkas persyaratan</li>
                                                        <li className='text-sm'>2. Pemohon mengisi form yang sudah disediakan</li>
                                                        <li className='text-sm'>3. Petugas mengecek dan memverifikasi kelengkapan berkas</li>
                                                        <li className='text-sm'>4. Petugas mengirim Surat Keterangan Tidak Mampu </li>
                                                        <li className='text-sm'>5. Pemohon diarahkan ke menu Cek Status untuk mengecek proses permohonan, jika sudah tervalidasi maka pemohon dapat mengunduh surat yang diajukan. </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure >
                                {({ close }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-50 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500/75">
                                            <span>Bagaimana cara melaporkan pengaduan atau mendapatkan Informasi di Desa Pandanwangi? </span>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-700">
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex flex-col gap-y-1">
                                                    <p className='text-sm pb-3'>Untuk melaporkan aduan atau mendapatkan informasi terkait dengan pelayanan umum di Desa Pandanwangi, anda dapat datang secara langsung ke Kantor Desa yang beralamat di Jln. Prof Moh Yamin No.15, Kec. Diwek, Kab. Jombang</p>
                                                    <p className='text-sm pb-3'>atau dapat menghubungi kami melalui media berikut :</p>
                                                    <ul>
                                                        <li>Instagram : @desapandawangan_asri</li>
                                                        <li>Facebook : Desa Pandanwangi Asri</li>
                                                        <li>Website : desapandawangan_asri.co.id</li>
                                                        <li>Telepon : (0857)85150153</li>
                                                        <li>E-Mail : desapandawangan_asri@gmail.com</li>
                                                    </ul>
                                                    <div className="flex flex-col gap-y-3 py-3">
                                                        <p>Selain melalui media di atas, Anda juga dapat menyampaikan aduan dan aspirasi anda melalui</p>
                                                        <span><Link to='/user/pengaduan' className='text-indigo-500 hover:py-2 px-3 hover:text-white hover:bg-blue-800 rounded-md' >Form Pengaduan</Link></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default FaqContent