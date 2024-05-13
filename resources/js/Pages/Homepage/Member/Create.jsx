import { Head, useForm, usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
export default function Create({ auth, errors }) {

    const { data, setData, post, progress } = useForm({
        nama_pengguna: "",
        no_telpon: "",
        alamat: "",
        email: "",
        info: "",
        lokasi: "",
    })

    const handlerSave = (e) => {
        e.preventDefault()
        
        post('member-add-save')

        setData('nama_pengguna','')
        setData('no_telpon','')
        setData('alamat','')
        setData('email','')
        setData('info','')
        setData('lokasi','')
    }

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
                                <h3 className='md:text-xl text-sm font-bold'>Formulir Pendaftaran</h3>
                            </div>

                        </div>
                        <form onSubmit={handlerSave} encType='multipart/form-data'>
                            <div>
                                <div className='flex items-center mb-3'>
                                    <InputLabel className='w-[140px] text-lg' htmlFor="Nama Lengkap" value="Nama Lengkap" />
                                    <div className="flex flex-col w-full">
                                        <input
                                            id="nama_pengguna"
                                            type="text"
                                            name="nama_pengguna"
                                            value={data.nama_pengguna}
                                            className="mt-1 block w-full rounded-[30px]"
                                            placeholder="Nama Lengkap"
                                            onChange={(e) => setData('nama_pengguna',e.target.value)}
                                        />

                                        <InputError message={errors.nama_pengguna} className="mt-2" />
                                    </div>
                                </div>
                                
                                <div className='flex items-center mb-3'>
                                    <InputLabel className='w-[140px]' htmlFor="Alamat" value="Alamat Lengkap" />
                                    <div className="flex flex-col w-full">
                                        <input
                                            id="alamat"
                                            type="text"
                                            name="alamat"
                                            value={data.alamat}
                                            className="mt-1 block w-full rounded-[30px]"
                                            placeholder="Alamat"
                                            onChange={(e) => setData('alamat',e.target.value)}

                                        />

                                        <InputError message={errors.alamat} className="mt-2" />
                                    </div>
                                </div>

                                <div className='flex items-center mb-3'>
                                    <InputLabel className='w-[140px]' htmlFor="No Telpon" value="Hp/Wa" />
                                    <div className="flex flex-col w-full">
                                        <input
                                            id="no_telpon"
                                            type="tel"
                                            name="no_telpon"
                                            value={data.no_telpon}
                                            className="mt-1 block w-full rounded-[30px]"
                                            placeholder="+62 xxx xxxx xxxx"
                                            onChange={(e) => setData('no_telpon',e.target.value)}

                                        />

                                        <InputError message={errors.no_telpon} className="mt-2" />
                                    </div>
                                </div>

                                <div className='flex items-center mb-3'>
                                    <InputLabel className='w-[140px]' htmlFor="Email" value="Email" />
                                    <div className="flex flex-col w-full">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full rounded-[30px]"
                                            placeholder="Email"
                                            onChange={(e) => setData('email',e.target.value)}
                                        />

                                        <InputError message={errors.email} className="mt-2" />
                                        
                                    </div>
                                </div>
                                
                                <div className='flex items-center mb-3'>
                                    <InputLabel className='w-[140px]' htmlFor="Lokasi" value="Lokasi" />
                                    <div className="flex flex-col w-full">
                                        <select
                                            id="lokasi"
                                            type="lokasi"
                                            name="lokasi"
                                            value={data.lokasi}
                                            className="mt-1 block w-full rounded-[30px]"
                                            placeholder="PILIH"
                                            onChange={(e) => setData('lokasi',e.target.value)}
                                        >
                                            <option value="">- PILIH -</option>
                                            <option value="Mediatama Web">Mediatama Web</option>
                                            <option value="Nazea Teknologi">Nazea Teknologi</option>
                                        </select>

                                        <InputError message={errors.lokasi} className="mt-2" />
                                        
                                    </div>
                                </div>

                                <div className="flex items-center mr-4 mb-3">
                                    <input type="checkbox" id="confirm" name="confirm" value="yes"  className='w-8 h-8 rounded-full '/>
                                    <label htmlFor="confirm" className="ml-5 select-none">Jika Terjadi <i className='font-bold'>Pembatalan</i> Uang Tidak Bisa Dikembalikan.</label>
                                </div>

                                <div>
                                    <p className='text-lg mb-3'>Mendapatkan Informasi Kursus Mediatama Web Dari?</p>

                                    <div className="grid grid-rows-3 grid-flow-col gap-3">
                                        <div>
                                            <div className="flex items-center">
                                                <input type="radio" id="info" name="info" onChange={(e) => setData('info',e.target.value)} value="Google"  className='w-5 h-5 rounded-full '/>
                                                <label htmlFor="info" className="ml-5 select-none">Google</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <input type="radio" id="info" name="info" onChange={(e) => setData('info',e.target.value)} value="Instagram"  className='w-5 h-5 rounded-full '/>
                                                <label htmlFor="info" className="ml-5 select-none">Instagram</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <input type="radio" id="info" name="info" onChange={(e) => setData('info',e.target.value)} value="Facebook"  className='w-5 h-5 rounded-full '/>
                                                <label htmlFor="info" className="ml-5 select-none">Facebook</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <input type="radio" id="info" name="info" onChange={(e) => setData('info',e.target.value)} value="Website"  className='w-5 h-5 rounded-full '/>
                                                <label htmlFor="info" className="ml-5 select-none">Website</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <input type="radio" id="info" name="info" onChange={(e) => setData('info',e.target.value)} value="Lainnya"  className='w-5 h-5 rounded-full '/>
                                                <label htmlFor="info" className="ml-5 select-none">Lainnya</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div>
                                    <p className='font-bold text-xs'>NB : AYO AJAK TEMAN-TEMAN KAMU DAN DAPATKAN CASHBACK Rp.50.000</p>
                                </div>
                                <PrimaryButton type="submit" className='ml-4'>Simpan</PrimaryButton>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )

}
