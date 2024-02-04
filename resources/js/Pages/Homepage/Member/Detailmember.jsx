import { Link, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faCancel, faCogs, faFileArchive, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2'

export default function Detailmember({auth, member, ongoing, finish}) {
    console.log(member);
    const [modal, setModal] = useState(false)
    const [modallinkedin, setModallinkedin] = useState(false)
    const [modalfoto, setModalfoto] = useState(false)
    const [modalshowcv, setModalshowcv] = useState(false)
    const [cv, setCv] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [foto, setFoto] = useState("")

    const handlerModalCv = async () =>  {
        setModal(true)
    }

    const handlerModalLinkedin = async () =>  {
        setModallinkedin(true)
    }

    const handlerModalFoto = async () =>  {
        setModalfoto(true)
    }

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
        setModal(false)
        setModallinkedin(false)
        setModalfoto(false)
        setModalshowcv(false)
    }

    const simpanCv = async () =>  {
        router.post(route("upload-cv"),{
            id : member.id,
            cv : cv
        })    
        handlerModalClose1()
    }
    
    const simpanLinkedin = async () =>  {
        router.post(route("upload-linkedin"),{
            id : member.id,
            linkedin : linkedin
        })  
        handlerModalClose1()
    }
    
    const simpanFoto = async () =>  {
        router.post(route("upload-profile"),{
            id : member.id,
            foto : foto
        })    
        handlerModalClose1()
    }

    return(
        <>
            <div className="container mx-auto mb-10">
                <div className="mt-5 flex justify-between ml-5 mr-5">
                    <Link href={route('member')} className="h-10 w-10 text-center pt-2 rounded-full bg-gray-600 text-white hover:bg-gray-400">
                        <FontAwesomeIcon icon={faBackspace}/>
                    </Link>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="h-10 w-10 rounded-full bg-gray-600 text-white hover:bg-gray-400">
                                <FontAwesomeIcon icon={faCogs}/>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <li className='p-1 gap-1 hover:bg-gray-100 cursor-pointer' type="button" onClick={() => handlerModalCv()}>Upload CV</li>
                            <li className='p-1 gap-1 hover:bg-gray-100 cursor-pointer' type="button" onClick={() => handlerModalLinkedin()}>Upload Linkedin</li>
                            <li className='p-1 gap-1 hover:bg-gray-100 cursor-pointer' type="button" onClick={() => handlerModalFoto()}>Upload Foto</li>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <div className="mt-5 flex justify-center">
                    <img className="object-cover md:h-80 md:w-80 w-40 h-40 rounded-full ring-2 ring-gray-300 p-1" src={`https://booking.mediatamaweb.com/`+ member.foto} alt="Rounded avatar" />
                </div>
                <p className="mt-3 text-center font-mono text-xl">{member.nama_pengguna}</p>
                <div className="flex justify-center mt-5">
                    <div className="mt-2 grid md:w-1/4 grid-cols-3 gap-3">
                        <a target='_blank' href={`https://mail.google.com/mail/?view=cm&to=${member.email}&su=SUBJECT&body=BODY&bcc=${member.email}`}>
                            <p className="text-center font-mono text-sm cursor-pointer hover:text-red-400"><FontAwesomeIcon className='w-6 h-6' icon={faMailBulk}/> </p>
                        </a>
                        <p onClick={() => openLinkedin()} className="text-center font-mono text-sm cursor-pointer hover:text-blue-400"><FontAwesomeIcon className='w-6 h-6' icon={faLinkedin}/></p>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <p className="text-center font-mono text-sm cursor-pointer hover:text-teal-400"><FontAwesomeIcon className='w-6 h-6' icon={faFileArchive}/></p>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <li className='p-1 gap-1 hover:bg-gray-100 cursor-pointer' type="button"  onClick={() => handlerModalshowcv()}>View CV</li>
                                <li className='p-1 gap-1 hover:bg-gray-100 cursor-pointer' type="button"  onClick={() => openCv()}>Download CV</li>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>

                <hr className="mt-5"/>

                <div className="grid gap-2 md:grid-cols-2">
                    <div className="mt-5 border p-3">
                        <span className="font-mono">Ongoing</span>
                        <table className="mt-2 table w-full">
                            <thead>
                                <tr className="border border-gray-100 [&>td]:p-2 text-left">
                                    <th className='w-14'>No</th>
                                    <th>Kelas</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ongoing.map((val, i) => (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{val.materi}</td>
                                            <td className='text-blue-400'>Ongoing</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5 border p-3">
                        <span className="font-mono">Finish</span>
                        <table className="mt-2 table w-full">
                            <thead>
                                <tr className="border border-gray-100 [&>td]:p-2">
                                    <th>No</th>
                                    <th>Kelas</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    finish.map((val, i) => (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{val.materi}</td>
                                            <td className='text-green-400'>Finish</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={modal}>
                    <div className="w-full bg-grey-200 p-3">
                        <div className="flex justify-between mb-3">
                            <p className='text-lg'>Upload Cv </p>
                            <div>
                                <button className='w-8 h-8 border border-blue-300 rounded-full bg-blue-300 hover:bg-blue-100 text-white' onClick={(e) => handlerModalClose1()}>x</button>
                            </div>
                        </div>
                        <div className='w-full'>
                            <p className='text-red-400'>Format yang diterima .pdf *</p>
                            <input type="file" onChange={(e) => setCv(e.target.files[0])} name="cv" id="cv" className="p-2 border rounded-md w-full" />
                            <div className="flex justify-end">
                                <button onClick={(_) => simpanCv()} className='bg-blue-500 hover:bg-blue-300 text-white rounded-md mt-3 p-2'>Simpan</button>
                            </div>
                        </div>
                    </div>
            </Modal>
            
            <Modal show={modallinkedin}>
                    <div className="w-full bg-grey-200 p-3">
                        <div className="flex justify-between mb-3">
                            <p className='text-lg'>Upload Url Linkedin </p>
                            <div>
                                <button className='w-8 h-8 border border-blue-300 rounded-full bg-blue-300 hover:bg-blue-100 text-white' onClick={(e) => handlerModalClose1()}>x</button>
                            </div>
                        </div>
                        <div className='w-full'>
                            <p className='text-red-400'>Pastikan Copy Linkedin anda dan pastekan kedalam form inputan dibawah *</p>
                            <input type="url" onChange={(e) => setLinkedin(e.target.value)} name="cv" id="cv" className="p-2 border rounded-md w-full" />
                            <div className="flex justify-end">
                                <button onClick={(_) => simpanLinkedin()} className='bg-blue-500 hover:bg-blue-300 text-white rounded-md mt-3 p-2'>Simpan</button>

                            </div>
                        </div>
                    </div>
            </Modal>
            
            <Modal show={modalfoto}>
                    <div className="w-full bg-grey-200 p-3">
                        <div className="flex justify-between mb-3">
                            <p className='text-lg'>Upload Foto </p>
                            <div>
                                <button className='w-8 h-8 border border-blue-300 rounded-full bg-blue-300 hover:bg-blue-100 text-white' onClick={(e) => handlerModalClose1()}>x</button>
                            </div>
                        </div>
                        <div className='w-full'>
                        <p className='text-red-400'>Format yang diterima .png, .jpg, .jpeg *</p>
                            <input type="file" onChange={(e) => setFoto(e.target.files[0])} name="cv" id="cv" className="p-2 border rounded-md w-full" />
                            <div className="flex justify-end">
                                <button onClick={(_) => simpanFoto()} className='bg-blue-500 hover:bg-blue-300 text-white rounded-md mt-3 p-2'>Simpan</button>
                            </div>
                        </div>
                    </div>
            </Modal>
            
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