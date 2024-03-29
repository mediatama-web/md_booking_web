import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import { pickBy } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

export default function Booking({ auth, booking, mentor }){
    const perpage = useRef(booking.per_page)
    const [isloadong, setIsloading] = useState(false)
    const [cari, setCari] = useState('')

    const jambooking = [
        '09:00',
        '09:30',
        '10:00',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
    ]

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })

    const handleChangeValue = (e) => {
        perpage.current = e.target.value
        getData()
    }

    const getData = () => {
        setIsloading(true)
        router.get(
            route().current(),
            pickBy({
                perpage : perpage.current,
                cari
            })
            ,{
                preserveScroll : true,
                preserveState : true,
                onFinish : () => setIsloading(false)
            }
        )
    }

    const handlerSearch = (e) => {
        e.preventDefault()
        getData()
    }

    const handlerStatus = (status, id) => {
        router.post(route('booking-statuschange'),{
            id : id,
            status : status
        })
    }

    const handlerJamChange = (jam, id) => {
        router.post(route('booking-jamchange'),{
            id : id,
            jam : jam
        })
    }

    const handlerMentor = (mentor, id) => {
        router.post(route('booking-mentorchange'),{
            id : id,
            mentor : mentor
        })
    }

    const hapusBooking = (id) => {
        Swal.fire({
            title: "Yakin Mehapus Data?",
            text: "Apakah Anda Yakin Ingin Menghapus Data Ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Saya Yakin!",
            cancelButtonText: "Batal"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.get(route('booking-delete',id))
                .then((res) => {
                    Swal.fire({
                        title: "Hapus Data!",
                        text: "Data Berhasil Dihapus.",
                        icon: "success"
                    });

                    getData()
                })
                .catch((err) => {
                    console.log(err);
                })
              
            }
          });
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
            <Head title="Jadwal Booking" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex justify-between items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-xs font-bold'>Booking Jadwal</h3>
                            </div>
                            <div>
                                <Link href={route('booking-add')} className='bg-slate-800 text-white p-2 rounded-md md:text-lg text-xs'>Tambah Data</Link>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-2">
                            <div className='my-2'>
                                <select
                                    name="perpage"
                                    id="perpage"
                                    className='rounded-lg md:text-sm text-xs'
                                    value={perpage.current}
                                    onChange={handleChangeValue}
                                >
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                            </div>
                            <div>
                                <form onSubmit={handlerSearch}>
                                    <div className="flex items-center gap-2">
                                        <TextInput
                                            className="md:tx-sm text-xs"
                                            name="cari"
                                            type="search"
                                            placeholder="Cari"
                                            value={cari}
                                            onChange={(e) => setCari(e.target.value)}
                                        />
                                        <PrimaryButton type="submit">Cari</PrimaryButton>
                                    </div>
                                </form>
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
                                    <th className='text-left md:text-sm text-xs'>Lokasi</th>
                                    <th className='text-left md:text-sm text-xs'>Status</th>
                                    <th className='text-left md:text-sm text-xs'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isloadong ? (
                                        <tr>
                                            <td colSpan={7} className='text-center md:text-sm text-xs'>
                                                <lottie-player
                                                    src="https://lottie.host/cbcdd4c1-5bf6-40fa-aeba-2f9344e967bd/D84dkkW3KV.json"
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
                                    ) :
                                        booking.data.length < 1 ?
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
                                        booking.data.map((data , i) => (
                                            <tr key={data.id} className='[&>td]:p-2 text-sm border border-grey-100'>
                                                <td className='border border-grey-100'>{booking.from + i}</td>
                                                <td className='border border-grey-100'>{data.nama_pengguna}</td>
                                                <td className='border border-grey-100'>{tanggalIndo(data.tanggal)}</td>
                                                <td className='border border-grey-100'>
                                                    <select
                                                        id="mentor"
                                                        className='rounded-lg text-sm'
                                                        value={data.jam}
                                                        onChange={(e) => handlerJamChange(e.target.value , data.id)}
                                                    >
                                                        {
                                                            jambooking.map((jm, i) => (
                                                                <option key={i} value={jm}>{jm}</option>
                                                            ))
                                                        }
                                                        <option value="pending"></option>
                                                    </select>
                                                </td>
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
                                                <td className='border border-grey-100'>{data.lokasi}</td>
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
                                                        <option value="dibatalkan">Dibatalkan</option>
                                                    </select>
                                                </td>
                                                <td className='w-24 flex gap-3 justify-center'>
                                                    <div onClick={() => hapusBooking(data.id)} className='hover:cursor-pointer hover:bg-red-400 bg-red-500 text-white p-2 w-9 text-center m-1 rounded-lg md:text-sm text-xs'><FontAwesomeIcon icon={faTrash}/></div>
                                                </td>

                                            </tr>
                                        )
                                        )
                                    )
                                }
                            </tbody>

                        </table>
                        <div className="flex items-center justify-between p-2">
                            <div className='md:text-sm text-xs'>
                                Melihat {booking.from ?? 0} sampai {booking.to ?? 0} dari {booking.total ?? 0} data
                            </div>
                            <div className="flex items-center gap-2">
                                {booking.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className='bg-slate-800 p-2 text-white md:text-sm text-xs rounded-md'
                                    >
                                        <div dangerouslySetInnerHTML = {{
                                            __html:link.label,
                                        }}/>

                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
