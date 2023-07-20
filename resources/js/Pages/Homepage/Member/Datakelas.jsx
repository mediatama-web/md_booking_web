import { useEffect, useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faUpload, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'

export default function Datakelas({ auth, member, kelas, kelasdaftar }){

    console.log(kelasdaftar);

    const materi = useRef(0)
    const [kelass, setKelass] = useState(0)
    const [kelasx, setKelas] = useState(0)
    const [harga, setHarga] = useState(0)
    const [metode, setMetode] = useState(0)
    const [bayar, setBayar] = useState(0)

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
            // jenis_pembayaran : metode,
            // jumlah_bayar : bayar
        })
    }

    const handlerHapus = (id) => {
        router.get(route('member-kelasHapus',id))
    }

    const handleChangeValue = (e) => {
        e.preventDefault()
        materi.current = e.target.value
        setKelass(e.target.value)

        var nilai = kelas[materi.current]
        setKelas(nilai.id)
        setHarga(nilai.harga)
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
                                                    <tr key={index}>
                                                        <td className='border border-grey-100 pl-2'>{index+1}</td>
                                                        <td className='border border-grey-100'>{data.materi}</td>
                                                        <td className='border border-grey-100 text-center'>0</td>
                                                        <td className='border border-grey-100 text-center'><Link className='bg-blue-400 text-xs p-1 text-white rounded-md w-12'><FontAwesomeIcon icon={faEye}/></Link></td>
                                                        <td className='border border-grey-100 text-center'><Link className='bg-blue-400 text-xs p-1 text-white rounded-md w-12'><FontAwesomeIcon icon={faEye} /></Link></td>
                                                        <td className='border border-grey-100 text-center'><Link className='bg-blue-400 text-xs p-1 text-white rounded-md w-12'><FontAwesomeIcon icon={faUpload} /></Link></td>
                                                        <td className='border border-grey-100'>
                                                            <div onClick={(_) => handlerHapus(data.id)} className='hover:cursor-pointer text-center m-1 p-1 rounded-md text-white text-xs bg-red-500'><FontAwesomeIcon icon={faTrash} /></div>
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
                                                <option disabled value="">-PILIH-</option>
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
                                        {/* <div className="mt-2 mb-2">
                                            <InputLabel htmlFor="Pembayaran" value="Pembayaran" />
                                            <select
                                            name="pembayaran"
                                            id="pembayawan"
                                            className='w-full rounded-lg border-gray-300'
                                                onChange={(e) => setMetode(e.target.value)}
                                            >
                                                <option value="" disabled>-PILIH-</option>
                                                <option value="cash">Cash</option>
                                                <option value="dp">Dp</option>
                                            </select>

                                        </div>
                                        <div className="mt-2 mb-2">
                                            <InputLabel htmlFor="Dibayar" value="Dibayar" />
                                            <TextInput type="number" onChange={(e) => setBayar(e.target.value)} className="w-full" />

                                        </div> */}
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
