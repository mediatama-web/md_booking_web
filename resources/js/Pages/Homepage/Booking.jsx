import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { pickBy } from 'lodash'

export default function Booking({ auth, booking }){
    const perpage = useRef(booking.per_page)
    const [isloadong, setIsloading] = useState(false)
    const [cari, setCari] = useState('')

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
                                <Link href="" className='bg-slate-800 text-white p-2 rounded-md md:text-lg text-xs'>Tambah Data</Link>
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
                                    <th className='text-left md:text-sm text-xs'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isloadong ? (
                                        <tr>
                                            <td colSpan={7} className='text-center md:text-sm text-xs'>Loading...</td>
                                        </tr>
                                    ) :
                                        booking.data.length < 1 ?
                                        <tr>
                                                <td colSpan={7} className='text-center md:text-sm text-xs p-2'>Data kosong..</td>
                                        </tr>
                                      :
                                    (
                                        booking.data.map((data , i) => (
                                            <tr key={data.id} className='[&>td]:p-2'>
                                                <td className='border border-grey-100'>{booking.from + i}</td>
                                                <td className='border border-grey-100'>{data.id_user}</td>
                                                <td className='border border-grey-100'>{data.tanggal}</td>
                                                <td className='border border-grey-100'>{data.jam}</td>
                                                <td className='border border-grey-100'>{data.id_mentor}</td>
                                                <td className='border border-grey-100'>{data.id_mentor}</td>
                                                <td className='border border-grey-100'>{data.status}</td>
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
