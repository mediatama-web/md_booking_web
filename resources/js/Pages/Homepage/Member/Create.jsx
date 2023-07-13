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
        password: "",
    })

    const handlerSave = (e) => {
        e.preventDefault()

        post('member-add-save', data, {
            forceFormData: true,
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Tambah Member" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-sm font-bold'>Tambah Member</h3>
                            </div>

                        </div>
                        <form onSubmit={handlerSave}>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                                <div>
                                    <InputLabel htmlFor="Nama LEngkap" value="Nama Lengkap" />

                                    <input
                                        id="nama_pengguna"
                                        type="text"
                                        name="nama_pengguna"
                                        value={data.nama_pengguna}
                                        className="mt-1 block w-full"
                                        placeholder="Nama Lengkap"
                                        onChange={(e) => setData('nama_pengguna',e.target.value)}

                                    />

                                    <InputError message={errors.nama_pengguna} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="No Telpon" value="No Telpon" />

                                    <input
                                        id="no_telpon"
                                        type="tel"
                                        name="no_telpon"
                                        value={data.no_telpon}
                                        className="mt-1 block w-full"
                                        placeholder="+62 xxx xxxx xxxx"
                                        onChange={(e) => setData('no_telpon',e.target.value)}

                                    />

                                    <InputError message={errors.no_telpon} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="Alamat" value="Alamat" />

                                    <input
                                        id="alamat"
                                        type="text"
                                        name="alamat"
                                        value={data.alamat}
                                        className="mt-1 block w-full"
                                        placeholder="Alamat"
                                        onChange={(e) => setData('alamat',e.target.value)}

                                    />

                                    <InputError message={errors.alamat} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="Email" value="Email" />

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        placeholder="Email"
                                        onChange={(e) => setData('email',e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="Password" value="Password" />

                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        placeholder="*******"
                                        onChange={(e) => setData('password',e.target.value)}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
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
