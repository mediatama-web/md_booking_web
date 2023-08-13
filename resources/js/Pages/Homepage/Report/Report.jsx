import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Mentor({ auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Report" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="flex items-center justify-between p-3 bg-white shadow-sm">
                            <div>
                                <p className="md:text-xl text-sm font-bold">Data Report</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-2 p-2">
                            

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
