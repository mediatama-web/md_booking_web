import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faMailBulk, faFileArchive } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'
import Modal from '@/Components/Modal';
import { useState } from "react";

export default function Sertifikat({auth, member, kelas}) {
    const [modalshowcv, setModalshowcv] = useState(false)
    const handlerModalshowcv = async () =>  {
        if(member.cv == null){
            Swal.fire({
                title: "Not Found!",
                text: "Belum Ada CV terupload!",
                icon: "error"
            })
        }else{
            setModalshowcv(true)
        }
    }

    const openLinkedin = () => {
        if(member.linkedin != null){
            window.open(member.linkedin, '_blank');
        }else{
            Swal.fire({
                title: "Not Found!",
                text: "Belum Ada Url!",
                icon: "error"
            })
        }
    }

    const openCv = () => {
        if(member.linkedin != null){
            window.open(`https://booking.mediatamaweb.com/${member.cv}`, '_blank');
        }else{
            Swal.fire({
                title: "Not Found!",
                text: "Belum Ada CV terupload!",
                icon: "error"
            })
        }
    }

    const handlerModalClose1 = () => {
        setModalshowcv(false)
    }
    return (
        <>
            <div className="container mx-auto mb-10">
                <div className="flex justify-center">
                    <img src="https://booking.mediatamaweb.com/sertifikat/logodepan.png" className="w-1/3 m-2" alt="logodepan" />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1">
                    <div>
                        <div className="mt-8 flex justify-center">
                            <img className="object-cover md:h-80 md:w-80 w-40 h-40 rounded-full ring-2 ring-gray-300 p-1" src={`https://booking.mediatamaweb.com/`+ member.foto} alt="Rounded avatar" />
                        </div>
                        <p className="mt-3 text-center font-mono text-xl">{member.nama_pengguna}</p>
                        <div className="flex justify-center">
                            <div className="mt-2 grid md:w-1/4 grid-cols-3 gap-3">
                                <a target='_blank' href={`https://mail.google.com/mail/?view=cm&to=${member.email}&su=SUBJECT&body=BODY&bcc=${member.email}`}>
                                    <p className="text-center font-mono text-sm cursor-pointer hover:text-red-400"><FontAwesomeIcon className='w-6 h-6' icon={faMailBulk}/> </p>
                                </a>
                                <a target='_blank' href={member.linkedin}>
                                    <p className="text-center font-mono text-sm cursor-pointer hover:text-blue-400"><FontAwesomeIcon className='w-6 h-6' icon={faLinkedin}/></p>
                                </a>
                                <p onClick={() => handlerModalshowcv()} className="text-center font-mono text-sm cursor-pointer hover:text-teal-400"><FontAwesomeIcon className='w-6 h-6' icon={faFileArchive}/></p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="grid-cols-1 grid md:gap-0 rounded-md">
                        <div className="grid gap-4">
                            <div className="mt-8 flex justify-center text-blue-400">
                                <div className="grid grid-cols-1 md:p-3">
                                    <div className="flex justify-center">
                                        <FontAwesomeIcon className="md:w-auto md:h-auto w-1/2 h-auto" icon={faCheckCircle}/>
                                    </div>
                                    <div className="text-center md:mt-0 mt-4">
                                        <p className="text-xl">Sertifikat Terverifikasi</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex p-3 gap-3 mt-5">
                            <img src={`https://booking.mediatamaweb.com//${kelas.foto}`} className="w-[150px] h-[150px]" alt="profile" />
                            <div className="grid grid-cols-1">
                                <div className="font-bold text-xl">
                                    Belajar {kelas.materi} <br />
                                    {kelas.pertemuan}x Pertemuan
                                </div>
                            </div>

                        </div>
                        
                    </div>

                </div>
            </div>

            <Modal show={modalshowcv} maxWidth="2xl">
                    <div className="w-full bg-grey-200 p-3">
                        <div className="flex justify-between mb-3">
                            <p className='text-lg'>View Cv</p>
                            <div>
                                <button className='w-8 h-8 border border-blue-300 rounded-full bg-blue-300 hover:bg-blue-100 text-white' onClick={(e) => handlerModalClose1()}>x</button>
                            </div>
                        </div>
                        <div className='w-full'>
                            <embed src={`https://booking.mediatamaweb.com/${member.cv}`} type="application/pdf" className='w-full h-[500px]'/>
                        </div>
                    </div>
            </Modal>
        </>
    )
}