import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2'

export default function Createkodemapel({auth, errors, ids, units}){
    const [unit , setUnit] = useState("")
    const [kode , setKode] = useState("")
    const [id , setId] = useState("")

    const saveData = () => {
        if(id != null){
            router.post(route("kelas-kode-mapel-save",id),{
                "id_kelas" : ids,
                "unit_kompetensi" : unit,
                "kode_unit" : kode
            })
        }else{
            router.post(route("kelas-kode-mapel-save"),{
                "id_kelas" : ids,
                "unit_kompetensi" : unit,
                "kode_unit" : kode
            })
        }
        setKode("")
        setUnit("")
        setId("")
    }
    
    const handlerEdit = (data) => {
        console.log(data);
        setId(data.id)
        setKode(data.kode_unit)
        setUnit(data.unit_kompetensi)
    }

    const handlerHapus = (id) => {
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
                axios.get(route('kelas-kode-mapel-delete',id))
                .then((res) => {
                    Swal.fire({
                        title: "Hapus Data!",
                        text: "Data Berhasil Dihapus.",
                        icon: "success"
                    });

                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err);
                })
              
            }
          });
    }
    
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
                                <h3 className='md:text-lg text-sm font-bold'>Kode Materi</h3>
                            </div>

                        </div>
                        <form>
                            <div className="items-center gap-2">
                                <div>
                                    <InputLabel htmlFor="Unit Kompetensi" value="Unit Kompetensi" />

                                    <input
                                        id="unit"
                                        type="text"
                                        name="unit"
                                        value={unit}
                                        className="mt-1 block w-full rounded-md "
                                        placeholder="Unit Kompetensi"
                                        onChange={(e) => setUnit(e.target.value)}
                                    />

                                    <InputError message={errors.unit_kompetensi} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="Kode Unit" value="Kode Unit" />

                                    <input
                                        id="kode"
                                        type="text"
                                        name="kode"
                                        value={kode}
                                        className="mt-1 block w-full rounded-md "
                                        placeholder="Kode Unit"
                                        onChange={(e) => setKode(e.target.value)}
                                    />

                                    <InputError message={errors.kode_unit} className="mt-2" />
                                </div>
                                
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton type="button" onClick={ (_) => saveData() } className='ml-4'>Simpan</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-sm font-bold'>Data Kode Materi</h3>
                            </div>
                        </div>
                        <table id="example" className="w-full p-4 border">
                            <thead>
                                <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                    <th className='text-left md:text-sm text-xs'>No</th>
                                    <th className='text-left md:text-sm text-xs'>Unit Komptensi</th>
                                    <th className='text-left md:text-sm text-xs'>Kode Unit</th>
                                    <th className='text-left md:text-sm text-xs w-24'>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    units.length < 1 ?
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
                                        units.map((data, i) => 
                                            (
                                                <tr key={data.id} className='[&>td]:p-2 text-sm'>
                                                    <td className='border border-grey-100'>{i+1}</td>
                                                    <td className='border border-grey-100'>{data.unit_kompetensi}</td>
                                                    <td className='border border-grey-100'>{data.kode_unit}</td>
                                                    <td className='border border-grey-100 text-center w-24'>
                                                        <FontAwesomeIcon className='m-3 hover:text-blue-400 text-blue-500 cursor-pointer' onClick={() => handlerEdit(data)} icon={faPencil} />
                                                        <FontAwesomeIcon className='m-3 text-red-400 hover:text-red-600 cursor-pointer' onClick={() => handlerHapus(data.id)} icon={faTrash} />
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}