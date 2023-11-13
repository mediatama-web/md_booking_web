import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth, booking, mentor }) {
    const [token ,setToken] = useState('')
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })
    
    const handlerStatus = (status, id) => {
        console.log(id);
        router.post('booking-statuschange',{
            id : id,
            status : status
        })
    }

    const handlerMentor = (mentor, id) => {
        console.log(id);
        router.post('booking-mentorchange',{
            id : id,
            mentor : mentor
        })
    }

    if ("Notification" in window) {
        // Check if the user has granted permission to show notifications
        if (Notification.permission === "granted") {
          // If permission is granted, show a notification
          showNotification();
        } else if (Notification.permission !== "denied") {
          // If permission has not been granted or denied, request permission
          Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
              // If the user grants permission, show a notification
              showNotification();
            }
          });
        }
      }
    
      function showNotification() {
        // Create a notification
        var notification = new Notification("Hello, World!", {
          body: "This is a sample notification.",
        });
    
        // Optionally, handle click event on the notification
        notification.onclick = function () {
          console.log("Notification clicked");
        };
      }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Selamat Datang" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex justify-between items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-xs font-bold'>Jadwal Booking Hari ini</h3>
                            </div>
                            
                        </div>
                     
                        <table id="example" className="w-full p-4 border">
                            <thead>
                                <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                    <th className='text-left md:text-sm text-xs'>No</th>
                                    <th className='text-left md:text-sm text-xs'>Nama Peserta</th>
                                    <th className='text-left md:text-sm text-xs'>Tanggal</th>
                                    <th className='text-left md:text-sm text-xs'>Jam</th>
                                    <th className='text-left md:text-sm text-xs'>Nama Mentor</th>
                                    <th className='text-left md:text-sm text-xs'>Kelas</th>
                                    <th className='text-left md:text-sm text-xs'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    booking.length < 1 
                                    ?
                                        <tr>
                                                <td colSpan={7} className='text-center md:text-sm text-xs p-2'>
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
                                        booking.map((data , i) => (
                                            <tr key={data.id} className='[&>td]:p-2 text-sm'>
                                                <td className='border border-grey-100'>{i+1}</td>
                                                <td className='border border-grey-100'>{data.nama_pengguna} <br /> {new Date(data.created_at).toJSON().slice(0, 16)}</td>
                                                <td className='border border-grey-100'>{data.tanggal}</td>
                                                <td className='border border-grey-100'>{data.jam}</td>
                                                <td className='border border-grey-100'>
                                                <select
                                                        id="mentor"
                                                        className='rounded-lg text-sm'
                                                        value={data.id_mentor}
                                                        onChange={(e) => handlerMentor(e.target.value , data.id)}
                                                    >
                                                        {
                                                            mentor.map((mtr, i) => (
                                                                <option key={i} value={mtr.id}>{mtr.nama_mentor}</option>
                                                            ))
                                                        }
                                                        <option value="pending"></option>
                                                    </select>
                                                </td>
                                                <td className='border border-grey-100'>{data.materi}</td>
                                                <td className='border border-grey-100 w-24 text-center'>
                                                    <select
                                                        id="status"
                                                        className='rounded-lg text-sm'
                                                        value={data.status}
                                                        onChange={(e) => handlerStatus(e.target.value , data.id)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="diterima">Diterima</option>
                                                        <option value="ditolak">Ditolak</option>
                                                    </select>
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
    );
}
