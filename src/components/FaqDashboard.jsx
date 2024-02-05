
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const FaqDashboard = () => {
    const faq = [
        { question: 'Bagaimana cara registrasi layanan ?', solution: '404' },
        { question: 'Apa saja persyaratan untuk pengajuan SKTM ?', solution: '404' },
        { question: 'Apa saja persyaratan untuk pengajuan Surat Kelahiran ?', solution: '404' },
        { question: 'Apa saja persyaratan untuk pengajuan Surat Kematian ?', solution: '404' },
        { question: 'Berapa lama proses validasi berkas pengajuan ?', solution: '404' },
        { question: 'Jika berkas saya hilang, dimana saya bisa mendapatkan berkas baru ?', solution: '404' },
    ]
    return (
        <>
            <div className="flex flex-col w-full h-full bg-gray-100 py-10 shadow-sm rounded-lg">
                <h3 className='text-xl md:text-3xl text-center text-gray-800'>Pertanyaan Umum</h3>
                <div className="w-full px-4 pt-10">
                    <div className=" flex flex-col gap-5 mx-auto w-full max-w-3xl rounded-2xl bg-white p-2">
                        {faq.map((item) => (
                            <Disclosure key={item.question}>
                                {({ close }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                                            <span>{item.question}</span>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-blue-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                            {item.solution}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaqDashboard