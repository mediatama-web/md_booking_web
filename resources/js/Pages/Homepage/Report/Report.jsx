import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Mentor({ auth}) {
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
                            {/* <tbody>
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
                                            <tr key={data.id} className='[&>td]:p-2 text-sm'>
                                                <td className='border border-grey-100'>{booking.from + i}</td>
                                                <td className='border border-grey-100'>{data.nama_pengguna}</td>
                                                <td className='border border-grey-100'>{data.tanggal}</td>
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
                            </tbody> */}

                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
