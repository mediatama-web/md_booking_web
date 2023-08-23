import { useEffect, useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faUpload, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import Modal from '@/Components/Modal';

export default function Datakelas({ auth, member, kelas, kelasdaftar }){

    const materi = useRef(0)
    const [kelass, setKelass] = useState(100)
    const [kelasx, setKelas] = useState(0)
    const [harga, setHarga] = useState(0)

    const [show, setShow] = useState(false)

    let IDR = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
    });

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })

    const handlerSimpan = (e) => {

        e.preventDefault()
        router.post(route('member-kelasdaftar',member.id),
        {
            id_kelas : parseInt(kelasx),
            id_user : parseInt(member.id),
        })
    }

    const handlerHapus = (id) => {
        router.get(route('member-kelasHapus',id))
    }

    const handleChangeValue = (e) => {
        e.preventDefault()
        if(e.target.value == 100){
            setKelass(e.target.value)

            setKelas(0)
            setHarga(0)
        }else{
            materi.current = e.target.value
            setKelass(e.target.value)
            
            var nilai = kelas[materi.current]
            setKelas(nilai.id)
            setHarga(nilai.harga)
        }
    }

    const handlerModal = (id) => {
        setShow(true)
    }
    const handlerModalClose = () => {
        setShow(!show)
    }

    return(
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Data Member" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex justify-between items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-xs font-bold text-gray-400'>Data Kelas</h3>
                            </div>
                            <div>
                                <h3 className='md:text-lg text-xs font-bold text-gray-400'>Nama : <span className='text-blue-400'>{member.nama_pengguna}</span></h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className='border col-span-2'>
                                <table id="example" className="w-full p-4 border border-gray-100">

                                    <thead>
                                        <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                            <th className='text-left md:text-sm text-xs'>No</th>
                                            <th className='text-left md:text-sm text-xs'>Kelas</th>
                                            <th className='text-left md:text-sm text-xs'>Total Pertemuan</th>
                                            <th className='text-left md:text-sm text-xs'>History Booking</th>
                                            <th className='text-left md:text-sm text-xs'>History Absen</th>
                                            <th className='text-left md:text-sm text-xs'>Sertifikat</th>
                                            <th className='text-left md:text-sm text-xs w-14'>#</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            kelasdaftar.length < 1 ? (
                                                <tr>
                                                    <td colSpan={7} className='text-center'>
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
                                            ) : (
                                                kelasdaftar.map((data, index) => (
                                                    <tr key={index} className='text-sm'>
                                                        <td className='border border-grey-100 pl-2'>
                                                            {index+1}
                                                        </td>
                                                        <td className='border border-grey-100 p-1'>
                                                            {data.kelas}
                                                        </td>
                                                        <td className='border border-grey-100 p-1 text-center'>
                                                            {data.total}
                                                        </td>
                                                        <td className='border border-grey-100 p-1 text-center'>
                                                            <i onClick={(e) => handlerModal(data.id)} className='cursor-pointer hover:bg-blue-200 bg-blue-400 text-xs p-1 text-white rounded-md w-12'>
                                                                <FontAwesomeIcon icon={faEye}/>
                                                            </i>
                                                        </td>
                                                        <td className='border border-grey-100 p-1 text-center'>
                                                            <i className='cursor-pointer hover:bg-blue-200 bg-blue-400 text-xs p-1 text-white rounded-md w-12'>
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </i>
                                                        </td>
                                                        <td className='border border-grey-100 p-1 text-center'>
                                                            <i className='cursor-pointer hover:bg-green-200 bg-green-400 text-xs p-1 text-white rounded-md w-24'>
                                                                <FontAwesomeIcon icon={faUpload} />
                                                            </i>
                                                        </td>
                                                        <td className='border border-grey-100 text-center w-14'>
                                                            <div onClick={(_) => handlerHapus(data.id)} className='hover:cursor-pointer text-center w-7 m-1 p-1 rounded-md text-white text-xs bg-red-500'>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))

                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className='container border'>
                                <div className="flex items-center">
                                    <p className='p-2 text-sm font-bold'>Tambah Data Kelas</p>
                                </div>
                                <div className="p-2 gap-2">
                                    <form onSubmit={handlerSimpan}>
                                        <div className="mt-2 mb-2">
                                            <InputLabel htmlFor="Kelas" value="Kelas" />
                                            <select
                                            id='kelas'
                                            name='kelas'
                                            value={kelass}
                                            className='w-full rounded-md border-gray-300'
                                            onChange={handleChangeValue}
                                            >
                                                <option value="100">-PILIH-</option>
                                                {
                                                kelas.map((data, index) => (
                                                    <option value={index} key={index}>{data.materi} - {data.jenis} - {IDR.format(data.harga)}</option>
                                                ))
                                                }
                                            </select>
                                        </div>

                                        <div className="mt-2 mb-2">
                                            <InputLabel htmlFor="Harga" value="Harga" />
                                            <TextInput type="text" readOnly value={IDR.format(harga)} className="w-full" />

                                        </div>
                                        <div className="flex items-center justify-end mt-2">
                                            <PrimaryButton type="submit">Simpan</PrimaryButton>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal show={show}>
                    <div className="w-full bg-grey-200 p-3">
                        <div className="flex justify-between mb-3">
                            <p className='text-lg'>Data Booking </p>
                            <div>
                                <button className='w-8 h-8 border border-blue-300 rounded-full bg-blue-300 hover:bg-blue-100 text-white' onClick={(e) => handlerModalClose()}>x</button>
                            </div>
                        </div>
                        <div>
                            <table className="w-full p-4">
                                <thead>
                                    <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                        <th>No</th>
                                        <th>Tanggal</th>
                                        <th>Jam</th>
                                        <th>Jam</th>
                                        <th>Kelas</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
            </Modal>
            </AuthenticatedLayout>
    )
}
