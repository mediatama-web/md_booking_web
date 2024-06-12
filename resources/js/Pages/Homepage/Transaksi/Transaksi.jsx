import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

export default function Transaksi({ auth, transaksi }) {
    const [month, setMonth] = useState("")
    
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })

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

    const handlerHapusMember = (id) => {
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
            router.get(route('transaksis-hapus',id))              
        }
        });
        
    }
    
    let IDR = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
    });
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
                                    <th className='text-left md:text-sm text-xs'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                            {
                                transaksi.data.length < 1 ? 
                                
                                    <tr>
                                        <td colSpan={9} className='text-center p-2 md:text-sm text-xs'>
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
                                 : (
                                    transaksi.data.map((data, i) => (
                                        <tr key={data.id} className='[&>td]:p-2 text-sm'>
                                            <td className='border border-grey-100'>{transaksi.from + i}</td>
                                            <td className='border border-grey-100'>{data.nama_pengguna}</td>
                                            <td className='border border-grey-100'>{data.materi}</td>
                                            <td className='text-right border border-grey-100'>{IDR.format(data.harga)}</td>
                                            <td className='border border-grey-100'><img src={data.foto ?? ""} alt="image" className='w-24' /></td>
                                            <td className='text-right border border-grey-100'>{tglIndo(data.tanggal)}</td>
                                            <td className='border border-grey-100'>
                                                <div className="flex justify-center items-center">
                                                    <button type='button' onClick={() => handlerHapusMember(data.id)} className='grid content-center justify-items-center hover:cursor-pointer hover:bg-red-400 bg-red-500 text-white p-2 w-9 text-center m-1 rounded-lg md:text-sm text-xs'><FontAwesomeIcon icon={faTrash}/></button>
                                                </div>
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
                                Melihat {transaksi.from ?? 0} sampai {transaksi.to ?? 0} dari {transaksi.total ?? 0} data
                            </div>
                            <div className="flex items-center gap-2">
                                {transaksi.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className='bg-slate-800 p-2 text-white md:text-sm text-xs rounded-md'
                                    >
                                        <div dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }} />

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
