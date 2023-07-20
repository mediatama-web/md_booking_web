import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Createkalas({auth, errors, kelas}){
    const [materi , setMateri] = useState()
    const [jenis , setJenis] = useState()
    const [harga , setHarga] = useState()

    const handlerSave = (e) => {
        e.preventDefault()
        if(kelas != null){
            router.post(route('kelas-add-save',kelas.id),{
                materi : materi,
                jenis : jenis,
                harga : harga,
            })
        }else{
            router.post('kelas-add-save',{
                materi : materi,
                jenis : jenis,
                harga : harga,
            })
        }
    }

    useEffect(() => {
        setMateri(kelas.materi)
        setJenis(kelas.jenis)
        setHarga(kelas.harga)
    },[kelas])
console.log(errors);
    return (

        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Kelas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-sm font-bold'>Kelas</h3>
                            </div>

                        </div>
                        <form onSubmit={handlerSave}>
                            <div className="items-center gap-2">
                                <div>
                                    <InputLabel htmlFor="Materi" value="Materi" />

                                    <input
                                        id="materi"
                                        type="text"
                                        name="materi"
                                        value={materi}
                                        className="mt-1 block w-full"
                                        placeholder="Materi"
                                        onChange={(e) => setMateri(e.target.value)}

                                    />

                                    <InputError message={errors.materi} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="Jenis" value="Jenis" />

                                    <select
                                        id="jenis"
                                        type="text"
                                        name="jenis"
                                        value={jenis}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setJenis(e.target.value)}

                                    >   
                                        <option value="" disabled>-PILIH-</option>
                                        <option value="Private">Private</option>
                                        <option value="Reguler">Reguler</option>
                                    </select>

                                    <InputError message={errors.jenis} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="Harga" value="Harga" />

                                    <input
                                        id="harga"
                                        type="number"
                                        name="harga"
                                        value={harga}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setHarga(e.target.value)}

                                    />

                                    <InputError message={errors.harga} className="mt-2" />
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