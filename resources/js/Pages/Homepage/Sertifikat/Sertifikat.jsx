import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faMailBulk, faFileArchive } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sertifikat({auth}) {
    return (
        <>
            <div className="container mx-auto mb-10">
                <div className="flex justify-end">
                    <img src="https://booking.mediatamaweb.com/sertifikat/logodepan.png" className="w-1/3 m-2" alt="" />
                </div>
                <div className="mt-8 flex justify-center">
                    <img className="h-1/4 w-1/4 rounded-full p-1 ring-2 ring-gray-300" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="Rounded avatar" />
                </div>
                <p className="mt-3 text-center font-mono text-xl">Gema Fajar Ramadhan</p>
                <div className="flex justify-center">
                    <div className="mt-2 grid md:w-1/4 grid-cols-3 gap-3">
                    <p className="text-center font-mono text-sm hover:text-red-400"><FontAwesomeIcon className='w-6 h-6' icon={faMailBulk}/> </p>
                    <p className="text-center font-mono text-sm hover:text-blue-400"><FontAwesomeIcon className='w-6 h-6' icon={faLinkedin}/></p>
                    <p className="text-center font-mono text-sm hover:text-teal-400"><FontAwesomeIcon className='w-6 h-6' icon={faFileArchive}/></p>
                    </div>
                </div>

                <hr className="mt-5" />

                <div className="mt-8 flex justify-center text-blue-400">
                    <FontAwesomeIcon className="w-1/6 h-1/6" icon={faCheckCircle}/>
                </div>
                <div className="text-center mt-4">
                    <p className="text-xl">Sertifikat Terverifikasi</p>
                </div>

                <div className="mt-5 flex justify-center rounded-md border p-2">
                    <table className="table w-full md:w-1/2 [&>td]:p-2">
                    <thead className="text-left">
                        <tr>
                        <th>Materi</th>
                        <td className="pl-5">Ms.Office</td>
                        </tr>
                        <tr>
                        <th>Lembaga</th>
                        <td className="pl-5">LPK Mediatama Web</td>
                        </tr>
                        <tr>
                        <th>Tanggal Terbit</th>
                        <td className="pl-5">2024-01-18</td>
                        </tr>
                    </thead>
                    </table>
                </div>
                </div>

        </>
    )
}