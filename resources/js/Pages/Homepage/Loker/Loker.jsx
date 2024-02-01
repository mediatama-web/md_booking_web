import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Loker({ auth , loker}) {
   
    const perpage = useRef(loker.per_page)
    const [isloadong, setIsloading] = useState(false)
    const [cari, setCari] = useState('')

    useEffect(() => {
        import('@fortawesome/react-fontawesome')
        import("@lottiefiles/lottie-player")
    })

    const handleChangeValue = (e) => {
        perpage.current = e.target.value
        getData()
    }

    let IDR = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
    });

    const getData = () => {
        setIsloading(true)
        router.get(
            route().current(),
            pickBy({
                perpage: perpage.current,
                cari
            })
            , {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsloading(false)
            }
        )
    }

    const handlerSearch = (e) => {
        e.preventDefault()
        getData()
    }

    const handlerHapus = (id) => {
        router.get(route('kelas-hapusKelas',id))
        getData()
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
            <Head title="Data Loker" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex justify-between items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-xs font-bold'>Data Loker</h3>
                            </div>
                            <div>
                                <Link href={route('loker-add')} className='bg-slate-800 text-white p-2 rounded-md md:text-lg text-xs'>Tambah Data</Link>
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
                                            className="md:text-sm text-xs"
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
                                    <th className='text-left md:text-sm text-xs'>Judul</th>
                                    <th className='text-left md:text-sm text-xs'>Informasi</th>
                                    <th className='text-left md:text-sm text-xs'>Tanggal Tayang</th>
                                    <th className='text-left md:text-sm text-xs'>Foto</th>
                                    <th className='text-left md:text-sm text-xs w-24'>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isloadong ? (
                                        <tr>
                                            <td colSpan={5} className='text-center md:text-sm text-xs'>
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
                                    loker.data.length < 1 ?
                                            <tr>
                                                <td colSpan={5} className='text-center p-2 md:text-sm text-xs'>
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
                                                loker.data.map((data, i) => (
                                                    <tr key={data.id} className='[&>td]:p-2 text-sm border border-grey-100'>
                                                        <td className='border border-grey-100'>{i+1}</td>
                                                        <td className='border border-grey-100'>{data.judul}</td>
                                                        <td className='border border-grey-100'>{data.deskripsi}</td>
                                                        <td className='text-right border border-grey-100'>{tanggalIndo(data.tgl_tayang)}</td>
                                                        <td className='border border-grey-100 text-center'>
                                                            <img src={data.foto} className='w-24' alt="" />
                                                        </td>
                                                        <td className='w-24 grid grid-cols-2 gap-2 p-4'>
                                                            <Link href={route('loker-add',data.id)} className='bg-blue-700 hover:bg-blue-600 text-white w-9 text-center p-2 rounded-lg md:text-sm text-xs m-1' >
                                                                <FontAwesomeIcon icon={faPencil} />
                                                            </Link>
                                                            <div onClick={() => handlerHapus(data.id)} className='hover:cursor-pointer hover:bg-red-400 bg-red-500 text-white p-2 w-9 text-center m-1 rounded-lg md:text-sm text-xs'><FontAwesomeIcon icon={faTrash}/></div>
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
                                Melihat {loker.from ?? 0} sampai {loker.to ?? 0} dari {loker.total ?? 0} data
                            </div>
                            <div className="flex items-center gap-2">
                                {loker.links.map((link, i) => (
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
