import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faMailBulk, faFileArchive } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "@/Components/Dropdown";
import Modal from '@/Components/Modal';
import { useState } from "react";

export default function Sertifikat({auth, member}) {
    const [modalshowcv, setModalshowcv] = useState(false)
    const handlerModalshowcv = async () =>  {
        setModalshowcv(true)
    }

    const handlerModalClose1 = () => {
        setModalshowcv(false)
    }
    return (
        <>
            <div className="container mx-auto mb-10">
                <div className="flex justify-end">
                    <img src="https://booking.mediatamaweb.com/sertifikat/logodepan.png" className="w-1/3 m-2" alt="" />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1">
                    <div>
                        <div className="mt-8 flex justify-center">
                            <img className="h-1/2 w-1/2 rounded-full p-1 ring-2 ring-gray-300" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="Rounded avatar" />
                        </div>
                        <p className="mt-3 text-center font-mono text-xl">Gema Fajar Ramadhan</p>
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
                            <img src="https://d17ivq9b7rppb3.cloudfront.net/original/academy/belajar_fundamental_aplikasi_flutter_logo_230421132717.jpg" className="w-[150px] h-[150px]" alt="" />
                            <div className="grid grid-cols-1">
                                <div className="font-bold text-xl">
                                    Belajar Ms. Office <br />
                                    8x Pertemuan
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
                            <embed src={`http://localhost:8000/${member.cv}`} type="application/pdf" className='w-full h-[500px]'/>
                        </div>
                    </div>
            </Modal>
        </>
    )
}