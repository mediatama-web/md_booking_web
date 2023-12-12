import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

export default function Mentor({ auth, report}) {
    const [month, setMonth] = useState("")
    const [isloadong, setIsLoading] = useState(false)

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })

    const filterData = () => {
        router.get(route('report',month))
    }

    const tanggalIndo = (tanggal) => {
        const date = new Date(tanggal);
        const formatDate = date.toLocaleDateString('id');
        return formatDate
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Report" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="flex items-center justify-between p-3 bg-white shadow-sm">
                            <div>
                                <p className="md:text-xl text-sm font-bold">Data Report</p>
                            </div>
                            <div className='flex'>
                                <input type="month" onChange={(e) => setMonth(e.target.value)} className='rounded-md' />
                                <button onClick={(e) => filterData()} className="bg-blue-600 hover:bg-blue-400 ml-2 rounded-md">
                                    <FontAwesomeIcon className='text-white p-3' icon={faSearch}/>
                                </button>
                            </div>
                        </div>
                        <table id="example" className="w-full p-4 border">
                            <thead>
                                <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                    <th className='text-left md:text-sm text-xs'>No</th>
                                    <th className='text-left md:text-sm text-xs'>Nama Mentor</th>
                                    <th className='text-left md:text-sm text-xs'>Total Mengajar</th>
                                    <th className='text-left md:text-sm text-xs'>Bulan</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {
                                    report.length < 1 ?
                                        <tr>
                                            <td colSpan={4} className='text-center md:text-sm text-xs p-2'>
                                                <lottie-player
                                                    src="https://lottie.host/d7294ce8-356d-48f3-a3b4-a551c2be7bed/p3BZckF4yh.json"
                                                    background="#fff"
                                                    speed="1"
                                                    style={{ width: '200px', height: '200px', margin: 'auto' }}
                                                    loop
                                                    autoplay
                                                    direction="1"
                                                    mode="normal">
                                                </lottie-player>
                                            </td>
                                        </tr>
                                      :
                                    (
                                        report.map((data , i) => (
                                            <tr key={i} className='[&>td]:p-2 text-sm'>
                                                <td className='border border-grey-100'>{i+1}</td>
                                                <td className='border border-grey-100'>{data.nama_mentor}</td>
                                                <td className='border text-center border-grey-100'>{data.total}</td>
                                                <td className='border text-center border-grey-100'>{tanggalIndo(data.tanggal)}</td>
                                                
                                            </tr>
                                        )
                                        )
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
