import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import axios from 'axios'

export default function Transaksi({ auth}) {
    const [month, setMonth] = useState("")
    const [modalData, setModaldata] = useState([])
    const [show, setShow] = useState(false)
    
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })

    const tanggalIndo = (tanggal) => {
        var  bulan =  [ "Januari" , "Februari" , "Maret" , "April" , "Mei" , "Juni" , "Juli" ,
            "Agustus" , "September" , "Oktober" , "November" , "Desember" ] ;
        const date = new Date(tanggal);
        const formatDate = bulan[date.getMonth()];

        return formatDate
    }

    const tglIndo = (tanggal) => {
        var  bulan =  [ "Januari" , "Februari" , "Maret" , "April" , "Mei" , "Juni" , "Juli" ,
            "Agustus" , "September" , "Oktober" , "November" , "Desember" ] ;
        const date = new Date(tanggal);
        const bulanx = bulan[date.getMonth()];
        const hari = date.getDay()
        const tahun = date.getFullYear()
        const formatDate = hari+" "+bulanx+" "+tahun
        return formatDate
    }

    const handlerModal = async (id) =>  {
        setShow(true)
    }

    const handlerModalClose1 = () => {
        setShow(false)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Transaksi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="flex items-center justify-between p-3 bg-white shadow-sm">
                            <div>
                                <p className="md:text-xl text-sm font-bold">Data Transaksi</p>
                            </div>
                            <div className='flex'>
                                <input type="month" onChange={(e) => setMonth(e.target.value)} className='rounded-md' />
                                <button className="bg-blue-600 hover:bg-blue-400 ml-2 rounded-md">
                                    <FontAwesomeIcon className='text-white p-3' icon={faSearch}/>
                                </button>
                            </div>
                        </div>
                        <table id="example" className="w-full p-4 border">
                            <thead>
                                <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                    <th className='text-left md:text-sm text-xs'>No</th>
                                    <th className='text-left md:text-sm text-xs'>Nama Member</th>
                                    <th className='text-left md:text-sm text-xs'>Kelas</th>
                                    <th className='text-left md:text-sm text-xs'>Harga</th>
                                    <th className='text-left md:text-sm text-xs'>Bukti Transfer</th>
                                    <th className='text-left md:text-sm text-xs'>Tanggal Order</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                <tr>
                                    <td colSpan={6} className='text-center md:text-sm text-xs p-2'>
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
                                
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

            <Modal show={show}>
                    <div className="w-full bg-grey-200 p-3">
                        <div className="flex justify-between mb-3">
                            <p className='text-lg'>History Mengajar </p>
                            <div>
                                <button className='w-8 h-8 border border-blue-300 rounded-full bg-blue-300 hover:bg-blue-100 text-white' onClick={(e) => handlerModalClose1()}>x</button>
                            </div>
                        </div>
                        <div>
                            <table className="w-full p-4">
                                <thead>
                                    <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                        <th>No</th>
                                        <th>Tanggal</th>
                                        <th>Jam</th>
                                        <th>Nama Member</th>
                                        <th>Kelas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
