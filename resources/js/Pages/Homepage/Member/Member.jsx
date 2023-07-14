import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useRef, useState, useEffect } from 'react';
import { pickBy } from 'lodash';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Switch } from '@headlessui/react'
import Modal from '@/Components/Modal';
export default function Member({auth, member}) {
    const perpage = useRef(member.per_page)
    const [isloadong, setIsloading] = useState(false)
    const [modal, setModal] = useState(false)
    const [cari, setCari] = useState("")

    const handleChangeValue = (e) => {
        perpage.current = e.target.value
        getData()
    }

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })

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

    const handlerStatus = (id) => {
        router.get(route('member-aktifasi',id))
        getData()
    }

    const handlerModal = () => {
        setModal(!modal)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Data Member" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex justify-between items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-xs font-bold'>Data Member</h3>
                            </div>
                            <div>
                                <Link href={route('member-add')} className='bg-slate-800 text-white md:text-lg text-xs p-2 rounded-md'>Tambah Data</Link>
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
                        <table id="example" className="w-full p-4 border border-gray-100">
                            <thead>
                                <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                    <th className='text-left md:text-sm text-xs'>No</th>
                                    <th className='text-left md:text-sm text-xs'>Nama Peserta</th>
                                    <th className='text-left md:text-sm text-xs'>No Telpon</th>
                                    <th className='text-left md:text-sm text-xs'>Email</th>
                                    <th className='text-left md:text-sm text-xs'>Alamat</th>
                                    <th className='text-left md:text-sm text-xs'>Tanggal Daftar</th>
                                    <th className='text-left md:text-sm text-xs'>Referal</th>
                                    <th className='text-left md:text-sm text-xs'>Foto</th>
                                    <th className='text-left md:text-sm text-xs'>Status</th>
                                    <th className='text-left md:text-sm text-xs'>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isloadong ? (
                                        <tr>
                                            <td colSpan={9} className='text-center md:text-sm text-xs'>
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
                                        member.data.length < 1 ?
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
                                      :
                                    (
                                            member.data.map((data, i) => (
                                            <tr key={data.id} className='[&>td]:p-2'>
                                                <td className='border border-grey-100'>{member.from + i}</td>
                                                <td className='border border-grey-100'>{data.nama_pengguna}</td>
                                                <td className='border border-grey-100'>{data.no_telpon}</td>
                                                <td className='border border-grey-100'>{data.email}</td>
                                                <td className='border border-grey-100'>{data.alamat}</td>
                                                <td className='border border-grey-100'>{data.tgl_daftar}</td>
                                                <td className='border border-grey-100'>{data.referal}</td>
                                                <td className='border border-grey-100'>{data.foto}</td>
                                                <td className='border border-grey-100'>
                                                        <Switch
                                                            checked={data.status_akun == 'aktif' ? true : false}
                                                            onChange={() => handlerStatus(data.id)}
                                                            className={`${data.status_akun == 'aktif' ? 'bg-blue-600' : 'bg-gray-200'
                                                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                                                        >
                                                            <span className="sr-only">Enable notifications</span>
                                                            <span
                                                                className={`${data.status_akun == 'aktif' ? 'translate-x-6' : 'translate-x-1'
                                                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                            />
                                                        </Switch>
                                                </td>
                                                <td className='border border-grey-100'>
                                                        <Link href={route('member-daftarkelas',data.id)} className='bg-blue-700 text-white p-2 m-1 rounded-lg md:text-sm text-xs'>Kelas</Link>
                                                    <Link href='' className='bg-blue-500 text-white p-2 m-1 rounded-lg md:text-sm text-xs'>Edit</Link>
                                                    <Link href='' className='bg-red-500 text-white p-2 m-1 rounded-lg md:text-sm text-xs'>Hapus</Link>
                                                </td>
                                            </tr>
                                        )
                                        )
                                    )
                                }
                            </tbody>

                        </table>
                        <div className="flex items-center justify-between p-2">
                            <div>
                                Melihat {member.from ?? 0} sampai {member.to ?? 0} dari {member.total ?? 0} data
                            </div>
                            <div className="flex items-center gap-2">
                                {member.links.map((link, i) => (
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

            <Modal show={modal} >
                <div className="flex items-center justify-between p-2">
                    <div>
                        <p className="p-2 text-lg font-bold">Data Kelas</p>
                    </div>
                    <div>
                        <div type='button' onClick={() => handlerModal} className='p2 text-gray-400'>X</div>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    )
}
