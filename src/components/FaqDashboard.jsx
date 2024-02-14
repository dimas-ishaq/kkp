
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const FaqDashboard = () => {
    return (
        <>
            <div className="flex flex-col w-full h-full bg-gray-100 py-10 shadow-sm rounded-lg">
                <h3 className='text-xl md:text-3xl text-center text-gray-800'>Pertanyaan Umum</h3>
                <div className="w-full px-4 pt-10">
                    <div className=" flex flex-col gap-5 mx-auto w-full max-w-3xl rounded-2xl bg-white p-2">
                        <Disclosure >
                            {({ close }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                                        <span>Apa saja layanan yang tersedia ?</span>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-blue-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 py-2 text-gray-500">
                                        <div className="flex flex-col gap-y-2">
                                            <h3 className='text-md font-semibold'>Pelayanan Legalisasi yang tersedia meliputi :</h3>
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
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                                        <span>Kapan jadwal pelayanan Desa Pandawangan mulai dibuka ?</span>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-blue-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                        <div className="flex flex-col gap-y-1">
                                            <h3 className='text-md font-semibold'>Berikut adalah jadwal pelayanan umum Desa Pandawangan:</h3>
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
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                                        <span>Bagaimana cara mengajukan pembuatan Surat Keterangan Lahir ?</span>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-blue-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
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
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                                        <span>Bagaimana cara mengajukan pembuatan Surat Keterangan Domisili ?</span>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-blue-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
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
                        <Disclosure >
                            {({ close }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                                        <span>Bagaimana cara mengajukan pembuatan Surat Keterangan Kematian ?</span>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-blue-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
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
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                                        <span>Bagaimana cara mengajukan pembuatan Surat Keterangan Tidak Mampu ? </span>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-blue-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
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
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                                        <span>Bagaimana cara melaporkan pengaduan atau mendapatkan Informasi di Desa Pandawangan? </span>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-blue-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex flex-col gap-y-1">
                                                <p className='text-sm pb-3'>Untuk melaporkan aduan atau mendapatkan informasi terkait dengan pelayanan umum di Desa Pandawangan, anda dapat datang secara langsung ke Kantor Desa yang beralamat di Jln. Pandawangan Asri No.21, Kec. Prapatan Watu, Kab. Wetan</p>
                                                <p className='text-sm pb-3'>atau dapat menghubungi kami melalui media berikut :</p>
                                                <ul>
                                                    <li>Instagram : @desapandawangan_asri</li>
                                                    <li>Facebook : Desa Pandawangan Asri</li>
                                                    <li>Website : desapandawangan_asri.co.id</li>
                                                    <li>Telepon : (0857)85150153</li>
                                                    <li>E-Mail : desapandawangan_asri@gmail.com</li>
                                                </ul>
                                                <div className="flex flex-col gap-y-3 py-3">
                                                    <p>Selain melalui media di atas, Anda juga dapat menyampaikan aduan dan aspirasi anda melalui</p>
                                                    <span><Link to='/user/pengaduan' className='text-blue-500 hover:py-2 px-3 hover:text-white hover:bg-blue-800 rounded-md' >Form Pengaduan Desa Pandawangan</Link></span>
                                                </div>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </div>
            </div >
        </>
    )
}

export default FaqDashboard