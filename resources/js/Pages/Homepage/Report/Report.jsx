import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import axios from 'axios'

export default function Mentor({ auth, report, bulans}) {
    const [month, setMonth] = useState("")
    const [modalData, setModaldata] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })
    
    useEffect(() => {
        setMonth(bulans)
    },[])

    const filterData = () => {
        console.log(month);
        router.get(route('report',month))
    }

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
        setModaldata([]);
        axios.get(route('report-detail',[id,month]))
        .then(function(res){
            console.log(res.data);
            if(res.data == null){
                setModaldata([]);
            }else{
                setModaldata(res.data.detail);
            }
            setShow(true)
        })
    }

    const handlerModalClose1 = () => {
        setShow(false)
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
                                                <td className='border text-center border-grey-100 cursor-pointer hover:text-blue-600' onClick={(_) => handlerModal(data.id_mentor)}>{data.total}</td>
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
                                    {
                                        modalData.map((d, i) => (
                                            <tr key={i} className='text-sm'>
                                                <td className='border border-grey-100 p-1 text-center'>{i+1}</td>
                                                <td className='border border-grey-100 p-1 text-center'>{tglIndo(d.tanggal)}</td>
                                                <td className='border border-grey-100 p-1 text-center'>{d.jam}</td>
                                                <td className='border border-grey-100 p-1'>{d.nama_pengguna}</td>
                                                <td className='border border-grey-100 p-1'>{d.materi}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
