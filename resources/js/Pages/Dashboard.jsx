import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard({ auth, booking, mentor }) {
    const [modal, setModal] = useState(false)
    const [status, setStatus] = useState("NULL")
    const [dari, setDari] = useState(0)
    const [sampai, setSampai] = useState(0)

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })
    
    const handlerStatus = (status, id) => {
        console.log(id);
        router.post('booking-statuschange',{
            id : id,
            status : status
        })
    }

    const handlerMentor = (mentor, id) => {
        console.log(id);
        router.post('booking-mentorchange',{
            id : id,
            mentor : mentor
        })
    }

    const tanggalIndo = (tanggal) => {
        const date = new Date(tanggal);
        const formatDate = date.toLocaleDateString('id');
        return formatDate
    }

    const handlerModal = () => {
        setModal(true)
    }

    const handlerModalClose = () => {
        setModal(false)
    }

    const filterData = () => {
        router.get(route('dashboard',[status,dari,sampai]))
    }
    
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Selamat Datang" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex justify-between items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-xs font-bold'>Jadwal Booking Hari ini</h3>
                            </div>
                            <div>
                                <FontAwesomeIcon onClick={(e) => handlerModal()} className='cursor-pointer' icon={faFilter}/>
                            </div>
                        </div>
                     
                        <table id="example" className="w-full p-4 border">
                            <thead>
                                <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                    <th className='text-left md:text-sm text-xs'>No</th>
                                    <th className='text-left md:text-sm text-xs'>Nama Peserta</th>
                                    <th className='text-left md:text-sm text-xs'>Tanggal</th>
                                    <th className='text-left md:text-sm text-xs'>Jam</th>
                                    <th className='text-left md:text-sm text-xs'>Nama Mentor</th>
                                    <th className='text-left md:text-sm text-xs'>Kelas</th>
                                    <th className='text-left md:text-sm text-xs'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    booking.length < 1 
                                    ?
                                        <tr>
                                                <td colSpan={7} className='text-center md:text-sm text-xs p-2'>
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
                                        booking.map((data , i) => (
                                            <tr key={data.id} className='[&>td]:p-2 text-sm'>
                                                <td className='border border-grey-100'>{i+1}</td>
                                                <td className='border border-grey-100'>{data.nama_pengguna}</td>
                                                <td className='border border-grey-100'>{tanggalIndo(data.tanggal)}</td>
                                                <td className='border border-grey-100'>{data.jam}</td>
                                                <td className='border border-grey-100'>
                                                <select
                                                        id="mentor"
                                                        className='rounded-lg text-sm'
                                                        value={data.id_mentor}
                                                        onChange={(e) => handlerMentor(e.target.value , data.id)}
                                                    >
                                                        {
                                                            mentor.map((mtr, i) => (
                                                                <option key={i} value={mtr.id}>{mtr.nama_mentor}</option>
                                                            ))
                                                        }
                                                        <option value="pending"></option>
                                                    </select>
                                                </td>
                                                <td className='border border-grey-100'>{data.materi}</td>
                                                <td className='border border-grey-100 w-24 text-center'>
                                                    <select
                                                        id="status"
                                                        className='rounded-lg text-sm'
                                                        value={data.status}
                                                        onChange={(e) => handlerStatus(e.target.value , data.id)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="diterima">Diterima</option>
                                                        <option value="ditolak">Ditolak</option>
                                                    </select>
                                                </td>

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

            <Modal maxWidth='sm' show={modal}>
                <div className="bg-grey-200 p-3">
                    <div className="flex justify-between mb-3">
                        <div>
                            <h3 className='text-lg font-bold'>Filter Data</h3>
                        </div>
                        <div>
                            <button className='w-8 h-8 border border-slate-600 rounded-full bg-slate-600 hover:bg-slate-400 text-white' onClick={() => handlerModalClose()}>x</button>
                        </div>
                    </div>
                    <div className="border-b-2 bg-slate-800"></div>
                    <div className='mt-4'>
                        <div className="grid w-full">
                            <label htmlFor="">Status</label>
                            <select type="text" onChange={(e) => setStatus(e.target.value)} className="w-full outline-1 rounded-md">
                                <option value="">-PILIH-</option>
                                <option value="Pending">Pending</option>
                                <option value="Diterima">Diterima</option>
                                <option value="Ditolak">Ditolak</option>
                            </select>
                        </div>
                        <div className="grid w-full">
                            <label htmlFor="">Dari Tanggal</label>
                            <input type="date" onChange={(e) => setDari(e.target.value)} className="w-full outline-1 rounded-md"/>
                        </div>
                        <div className="grid w-full">
                            <label htmlFor="">Sampai Tanggal</label>
                            <input type="date" onChange={(e) => setSampai(e.target.value)} className="w-full outline-1 rounded-md"/>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button onClick={(e) => filterData()} type="button"  className='w-full bg-slate-600 hover:bg-slate-400 p-2 rounded-md text-white'>  Filter  </button>
                        </div>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    );
}
