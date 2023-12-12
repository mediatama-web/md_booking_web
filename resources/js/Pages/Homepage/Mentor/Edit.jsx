import { Head, useForm, usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
export default function Edit({ auth, errors, mentor }) {

    const { data, setData, post, progress } = useForm({
        nama_mentor: mentor.nama_mentor,
        bidang: mentor.bidang,
        email: mentor.email,
        telpon: mentor.telpon,
        alamat: mentor.alamat,
        foto : ""
    })

    const handlerSave = (e) => {
        e.preventDefault()

        post(route('mentor-save',mentor.id), data, {
            forceFormData: true,
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Tambah Mentor" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-sm font-bold'>Edit Mentor</h3>
                            </div>

                        </div>
                        <form onSubmit={handlerSave}>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                                <div>
                                    <InputLabel htmlFor="Nama Lengkap" value="Nama Lengkap" />

                                    <input
                                        id="nama_mentor"
                                        type="text"
                                        name="nama_mentor"
                                        value={data.nama_mentor}
                                        className="mt-1 block w-full"
                                        placeholder="Nama Lengkap"
                                        onChange={(e) => setData('nama_mentor',e.target.value)}

                                    />

                                    <InputError message={errors.nama_mentor} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="Bidang" value="Bidang" />

                                    <input
                                        id="bidang"
                                        type="text"
                                        name="bidang"
                                        value={data.bidang}
                                        className="mt-1 block w-full"
                                        placeholder="Bidang"
                                        onChange={(e) => setData('bidang',e.target.value)}

                                    />

                                    <InputError message={errors.bidang} className="mt-2" />
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
                                <div>
                                    <InputLabel htmlFor="Telpon" value="Telpon" />

                                    <input
                                        id="telpon"
                                        type="tel"
                                        name="telpon"
                                        value={data.telpon}
                                        className="mt-1 block w-full"
                                        placeholder="+62"
                                        onChange={(e) => setData('telpon',e.target.value)}
                                    />

                                    <InputError message={errors.telpon} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="Alamat" value="Alamat" />

                                    <textarea
                                        id="alamat"
                                        name="alamat"
                                        value={data.alamat}
                                        className="mt-1 block w-full"
                                        placeholder="Alamat"
                                        onChange={(e) => setData('alamat',e.target.value)}
                                    ></textarea>

                                    <InputError message={errors.alamat} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="Foto" value="Foto" />

                                    <input
                                        id="foto"
                                        type="file"
                                        name="foto"
                                        className="mt-1 block w-full"
                                        placeholder="+62"
                                        onChange={(e) => setData('foto', e.target.files[0])}
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
