import { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Datakelas({auth,member, kelas}){
    const materi = useRef(0)
    const [kelasx, setKelas] = useState(0)
    const [harga, setHarga] = useState(0)

    let IDR = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
    });

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })

    const handlerSimpan = (e) => {
        e.preventDefault()
        route.post()
    }

    const handleChangeValue = (e) => {
        e.preventDefault()
        setKelas(e.target.value)
        materi.current = e.target.value
        console.log(materi)
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
                                            <th className='text-left md:text-sm text-xs'>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
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
                                            value={kelasx}
                                            className='w-full rounded-md'
                                            onChange={handleChangeValue}
                                            >
                                                <option disabled value="">-PILIH-</option>
                                                {
                                                kelas.map((data, index) => (
                                                    <option value={data.id} key={index}>{data.materi} - {data.jenis} - {IDR.format(data.harga)}</option>
                                                ))
                                                }
                                            </select>
                                        </div>

                                        <div className="mt-2 mb-2">
                                            <InputLabel htmlFor="Harga" value="Harga" />
                                            <TextInput type="text" readOnly className="w-full" />

                                        </div>
                                        <div className="mt-2 mb-2">
                                            <InputLabel htmlFor="Pembayaran" value="Pembayaran" />
                                            <TextInput type="text" readOnly className="w-full" />

                                        </div>
                                        <div className="mt-2 mb-2">
                                            <InputLabel htmlFor="Dibayar" value="Dibayar" />
                                            <TextInput type="text" readOnly className="w-full" />

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
            </AuthenticatedLayout>
    )
}
