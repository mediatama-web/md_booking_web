import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Create({auth,pengguna, mentor, daftarkelas, errors}){
    const jambooking = [
        '09:00',
        '09:30',
        '10:00',
        '14:00',
        '14:30',
        '15:00',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
    ]

    const tgl = new Date().toJSON().slice(0, 10)

    var [kelasmember, setKelasmember] = useState([])

    const handlerChangeuser = (id) => {
        var data = daftarkelas.filter(obj => {
            return obj.id_user == parseInt(id)
        })

        setIduser(id)
        setKelasmember(data ? data : [])
    }

    useEffect(() => {

    },[kelasmember])

    const [id_user , setIduser] = useState()
    const [tanggal , setTanggal] = useState(tgl)
    const [jam , setJam] = useState('09:00')
    const [id_daftarkelas , setKelas] = useState()
    const [id_mentor , setMentor] = useState()

    const handlersimpan = (e) => {
        router.post(route('booking-save'),{
            id_user : id_user,
            tanggal : tanggal,
            jam : jam,
            id_daftarkelas : id_daftarkelas,
            id_mentor : id_mentor,
        })

        setIduser(0)
        setTanggal(tgl)
        setJam('09:00')
        setKelas(0)
        setMentor(0)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
        <Head title="Jadwal Booking" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                    <div className="flex items-center p-2">
                        <div>
                            <h3 className='md:text-lg text-xs font-bold'>Booking</h3>
                        </div>
                    </div>
                    <div className="p-2 items-center justify-items-center">
                        <form>
                            <div className='w-full m-2'>
                                <InputLabel>Nama Peserta</InputLabel>
                                <select
                                    id='id_user'
                                    className='w-full rounded-md p-2 border'
                                    onChange={(e) => handlerChangeuser(e.target.value)}
                                    value={id_user}
                                >
                                    <option value="0">-Pilih-</option>
                                    {
                                        pengguna.map((p,i) => (
                                            <option key={i} value={p.id}>{p.nama_pengguna}</option>
                                        ))
                                    }
                                </select>

                                <InputError message={errors.id_user} className="mt-2" />
                            </div>

                            <div className='w-full m-2'>
                                <InputLabel>Tanggal</InputLabel>
                                <input
                                    type="date"
                                    name="tanggal"
                                    id="tanggal"
                                    onChange={(e) => setTanggal(e.target.value)}
                                    value={tanggal}
                                    className="w-full rounded-md"
                                />

                                <InputError message={errors.tanggal} className="mt-2" />
                            </div>

                            <div className='w-full m-2'>
                                <InputLabel>Jam</InputLabel>
                                <select
                                    id='jam'
                                    onChange={(e) => setJam(e.target.value)}
                                    value={jam}
                                    className='w-full rounded-md p-2 border'
                                >
                                    <option value="0">-Pilih-</option>
                                    {
                                        jambooking.map((data, i) => (

                                            <option key={i}>{data}</option>
                                        ))
                                    }

                                </select>

                                <InputError message={errors.jam} className="mt-2" />
                            </div>

                            <div className='w-full m-2'>
                                <InputLabel>Kelas</InputLabel>
                                <select
                                    id='kelas'
                                    className='w-full rounded-md p-2 border'
                                    onChange={(e) => setKelas(e.target.value)}
                                    value={id_daftarkelas}
                                >
                                    <option value="0">-Pilih-</option>
                                    {
                                        kelasmember.map((d , i) => (
                                            <option key={i} value={kelasmember[i].id}>{kelasmember[i].materi}</option>
                                        ))
                                    }
                                </select>

                                <InputError message={errors.id_daftarkelas} className="mt-2" />
                            </div>

                            <div className='w-full m-2'>
                                <InputLabel>Mentor</InputLabel>
                                <select
                                    id='mentor'
                                    className='w-full rounded-md p-2 border'
                                    onChange={(e) => setMentor(e.target.value)}
                                    value={id_mentor}
                                >
                                    <option value="0">-Pilih-</option>
                                    {
                                        mentor.map((p,i) => (
                                            <option key={i} value={p.id}>{p.nama_mentor}</option>
                                        ))
                                    }
                                </select>

                                <InputError message={errors.id_mentor} className="mt-2" />
                            </div>
                            <div className="flex items-center justify-end">
                                <PrimaryButton onClick={handlersimpan} type="button">Booking</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}
