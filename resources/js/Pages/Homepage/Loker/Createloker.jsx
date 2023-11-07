import { Head, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
export default function Createloker({ auth, errors, loker }) {

    const [judul, setJudul] = useState()
    const [deskripsi, setDeskripsi] = useState()
    const [foto, setFoto] = useState()

    const handlerSave = (e) => {
        e.preventDefault()
        if(loker != null){
            router.post(route('loker-save',loker.id),{
                judul: judul,
                deskripsi: deskripsi,
                foto: foto
            })
        } else{
            router.post(route('loker-save'),{
                judul: judul,
                deskripsi: deskripsi,
                foto: foto
            })
        }

        setJudul('')
        setDeskripsi('')
        setFoto('')
    }

    useEffect(() => {
        setJudul(loker.judul)
        setDeskripsi(loker.deskripsi)
    },[loker])

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Tambah Member" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex items-center p-2 justify-center">
                            <div>
                                <h3 className='md:text-xl text-sm font-bold'>Form Input Loker</h3>
                            </div>

                        </div>
                        <form onSubmit={handlerSave} encType='multipart/form-data'>
                            <div>
                                <div className='flex items-center mb-3'>
                                    <InputLabel className='w-[140px] text-lg' htmlFor="Judul" value="Judul" />

                                    <input
                                        id="judul"
                                        type="text"
                                        name="judul"
                                        value={judul}
                                        className="mt-1 block w-full rounded-[30px]"
                                        placeholder="Judul"
                                        onChange={(e) => setJudul(e.target.value)}
                                    />

                                    <InputError message={errors.judul} className="mt-2" />
                                </div>
                                
                                <div className='flex items-center mb-3'>
                                    <InputLabel className='w-[140px]' htmlFor="Deskripsi" value="Deskripsi" />

                                    <textarea
                                        id="deskripsi"
                                        name="deskripsi"
                                        value={deskripsi}
                                        className="mt-1 block w-full h-24 rounded-[30px]"
                                        placeholder="Deskripsi"
                                        onChange={(e) => setDeskripsi(e.target.value)}

                                    />

                                    <InputError message={errors.alamat} className="mt-2" />
                                </div>

                                <div className='flex items-center mb-3'>
                                    <InputLabel className='w-[140px]' htmlFor="Foto" value="Foto" />

                                    <input
                                        id="foto"
                                        type="file"
                                        name="foto"
                                        className="mt-1 block w-full rounded-[30px]"
                                        onChange={(e) => setFoto(e.target.files[0])}

                                    />

                                    <InputError message={errors.foto} className="mt-2" />
                                </div>
                                
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton type="submit" className='ml-4'>Simpan</PrimaryButton>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )

}
