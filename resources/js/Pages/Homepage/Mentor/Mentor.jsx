import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Switch } from '@headlessui/react'
import { useState, useRef } from 'react';
 

export default function Mentor({ auth , mentors}) {
    const perpage = useRef(mentors.perPage)
    const [isloadong, setIsloading] = useState(false)

    const handlerStatus = (id, status) => {
        router.get(route('mentor-status',[id,status]))
    }

    const getData = () => {
        setIsloading(true)
        router.get(
            route().current(),
            pickBy({
                perpage: perpage.current,
            })
            , {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsloading(false)
            }
        )
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Mentor" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="flex items-center justify-between p-3 bg-white shadow-sm">
                            <div>
                                <p className="md:text-xl text-sm font-bold">Data Mentor</p>
                            </div>
                            <div>
                                <Link href={route('mentor-add')} className='p-2 bg-slate-800 text-white rounded-md md:text-lg text-xs'>Tambah Data</Link>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-2 p-2">
                            {
                                mentors.data.map((data , i) => (
                                    <div key={i}>
                                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-[url('./image/mediatama.png')] bg-contain bg-center bg-no-repeat">
                                            <div className="flex flex-col items-center pb-10 pt-10 static">
                                                <img className="md:w-32 md:h-32 w-16 h-16 mb-2 rounded-full shadow-lg" src={data.foto ? data.foto : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="Bonnie image" />

                                                <h5 className="mb-1 md:text-xl text-xs font-medium text-gray-900 dark:text-white">{data.nama_mentor}</h5>
                                                <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">{data.bidang}</span>
                                                <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">{data.status}</span>
                                                <div className="mt-3">
                                                    <Switch
                                                      checked={data.status == 'aktif' ? true : false}
                                                      onChange={() => handlerStatus(data.id, data.status)}
                                                      className={`${
                                                        data.status == 'aktif' ? 'bg-blue-900' : 'bg-gray-200'
                                                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                                                    >
                                                      <span
                                                        className={`${
                                                          data.status == 'aktif' ? 'translate-x-6' : 'translate-x-1'
                                                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                      />
                                                    </Switch>
                                                </div>
                                                <div className="flex mt-4 space-x-3 md:mt-6">
                                                    <a href={route('mentor-edit',data.id)} className="inline-flex items-center md:px-4 md:py-2 py-1 px-2 md:text-sm text-xs md:font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Edit Data</a>
                                                    <a href={route('mentor-add',data.id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">Detail</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className="flex items-center justify-between p-2">
                            <div className='md:text-sm text-xs'>
                                Melihat {mentors.from ?? 0} sampai {mentors.to ?? 0} dari {mentors.total ?? 0} data
                            </div>
                            <div className="flex items-center gap-2">
                                {mentors.links.map((link, i) => (
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
