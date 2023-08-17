import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard({ auth }) {
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Selamat Datang" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <lottie-player
                                src="https://lottie.host/89c5e47b-6846-4203-b06e-2dd344a3e65f/0fW0LkNzd6.json"
                                background="#fff"
                                speed="1"
                                style={{ width: 'auto', height: 'auto', margin: 'auto' }}
                                loop
                                autoplay
                                direction="1"
                                mode="normal">
                            </lottie-player>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
