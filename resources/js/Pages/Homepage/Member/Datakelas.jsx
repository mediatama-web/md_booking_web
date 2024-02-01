import { useEffect, useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faFile, faTrash, faPencil, faFileArchive, faCancel, faCheck } from '@fortawesome/free-solid-svg-icons'
import Modal from '@/Components/Modal';
import axios from 'axios';
import Swal from 'sweetalert2'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Datakelas({ auth, member, kelas, kelasdaftar }){

    const materi = useRef(0)
    const [kelass, setKelass] = useState(100)
    const [kelasx, setKelas] = useState(0)
    const [harga, setHarga] = useState(0)

    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)

    const [modalbooking, setmodalbooking] = useState([])
    const [modalabsen, setmodalabsen] = useState([])

    let IDR = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
    });

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })

    const getData = (e) => {
        window.location.reload()
    }

    const handlerSimpan = (e) => {

        e.preventDefault()
        router.post(route('member-kelasdaftar',member.id),
        {
            id_kelas : parseInt(kelasx),
            id_user : parseInt(member.id),
        })
    }

    const handleChangeValue = (e) => {
        e.preventDefault()
        if(e.target.value == 100){
            setKelass(e.target.value)

            setKelas(0)
            setHarga(0)
        }else{
            materi.current = e.target.value
            setKelass(e.target.value)
            
            var nilai = kelas[materi.current]
            setKelas(nilai.id)
            setHarga(nilai.harga)
        }
    }

    const handlerModal = async (id) =>  {
        setmodalbooking([]);
        axios.get(route('member-kelasdaftar-detail',[member.id,id]))
        .then(function(res){
            console.log(res.data);
            if(res.data == null){
                setmodalbooking([]);
            }else{
                setmodalbooking(res.data);
            }
            setShow(true)
        })
    }
    
    const [idkelas, setIdkelas] = useState('')
    const handlerModal1 = async (id) =>  {
        setIdkelas(id)
        setmodalabsen([]);
        axios.get(route('member-absen',[member.id,id]))
        .then(function(res){
            if(res.data == null){
                setmodalabsen([]);
            }else{
                setmodalabsen(res.data);
            }
            setShow1(true)
        })
    }
    
    const [linkeds, setLinkeds] = useState(false)
    const [cvs, setCvs] = useState(false)
    const handlerModal2 = async (id) =>  {
        setIdkelas(id)
        setShow2(true)

        axios.get(route('cekdatauser',id))
        .then((res) => {
            if(res.data.data.cv){
                setCvs(true)
            }else{
                setCvs(false)
            }
            
            if(res.data.data.linkedin){
                setLinkeds(true)
            }else{
                setLinkeds(false)
            }
        })
        .catch((err) => {

        })
    }

    const handlerModalClose = () => {
        setShow(!show)
    }

    const handlerModalClose1 = () => {
        setShow1(!show1)
    }
    
    const handlerModalClose2 = () => {
        setShow2(!show2)
    }

    const handlerAbsen = () => {
        axios.get(route('member-absen-detail',[member.id,idkelas]))
        .then(function(res){
            handlerModal1(idkelas)
        })
    }

    const hapusKelas = (id) => {
        Swal.fire({
            title: "Yakin Mehapus Data?",
            text: "Apakah Anda Yakin Ingin Menghapus Data Ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Saya Yakin!",
            cancelButtonText: "Batal"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.get(route('member-kelasHapus',id))
                .then((res) => {
                    Swal.fire({
                        title: "Hapus Data!",
                        text: "Data Berhasil Dihapus.",
                        icon: "success"
                    });

                    getData()
                })
                .catch((err) => {
                    console.log(err);
                })
            }
          });
    }

    const handlerGenerate = () => {
        router.get(route('member-generate',idkelas))
    }

    return(
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Data Member" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white md:overflow-hidden overflow-auto shadow-sm sm:rounded-lg p-4">
                        <div className="flex justify-between items-center p-2">
                            <div>
                                <h3 className='md:text-lg text-xs font-bold text-gray-400'>Data Kelas</h3>
                            </div>
                            <div>
                                <h3 className='md:text-lg text-xs font-bold text-gray-400'>Nama : <span className='text-blue-400'>{member.nama_pengguna}</span></h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className='border col-span-2'>
                                <table id="example" className="w-full p-4 border border-gray-100">

                                    <thead>
                                        <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                            <th className='text-left md:text-sm text-xs'>No</th>
                                            <th className='text-left md:text-sm text-xs'>Kelas</th>
                                            <th className='text-left md:text-sm text-xs'>Total Pertemuan</th>
                                            <th className='text-left md:text-sm text-xs'>History Booking</th>
                                            <th className='text-left md:text-sm text-xs'>History Absen</th>
                                            <th className='text-left md:text-sm text-xs'>Sertifikat</th>
                                            <th className='text-left md:text-sm text-xs w-14'>#</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            kelasdaftar.length < 1 ? (
                                                <tr>
                                                    <td colSpan={7} className='text-center'>
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
                                            ) : (
                                                kelasdaftar.map((data, index) => (
                                                    <tr key={index} className='text-sm'>
                                                        <td className='border border-grey-100 pl-2'>
                                                            {index+1}
                                                        </td>
                                                        <td className='border border-grey-100 p-1'>
                                                            {data.kelas}
                                                        </td>
                                                        <td className='border border-grey-100 p-1 text-center'>
                                                            {data.total}
                                                        </td>
                                                        <td className='border border-grey-100 p-1 text-center'>
                                                            <i onClick={(e) => handlerModal(data.id_kelas)} className='cursor-pointer hover:bg-blue-200 bg-blue-400 text-xs p-1 text-white rounded-md w-12'>
                                                                <FontAwesomeIcon icon={faEye}/>
                                                            </i>
                                                        </td>
                                                        <td className='border border-grey-100 p-1 text-center'>
                                                            <i onClick={(e) => handlerModal1(data.id_kelas)} className='cursor-pointer hover:bg-blue-200 bg-blue-400 text-xs p-1 text-white rounded-md w-12'>
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </i>
                                                        </td>
                                                        <td className='border border-grey-100 p-1 text-center'>
                                                                {
                                                                    data.sertifikat == 0
                                                                    ? 
                                                                    <i onClick={(e) => handlerModal2(data.id)} className='cursor-pointer hover:bg-green-200 bg-green-400 text-xs p-1 text-white rounded-md w-24'>
                                                                        Terbitkan Sertifikat 
                                                                        <FontAwesomeIcon className='ml-2' icon={faPencil} />
                                                                    </i>
                                                                    :
                                                                    <div className="flex justify-center">
                                                                        <a target="_blank" href={route('sertifikat-depan',[member.id,data.id_kelas])} className='cursor-pointer hover:bg-green-200 bg-green-400 text-xs p-1 text-white rounded-md w-24'>
                                                                            Lihat <FontAwesomeIcon className='ml-2' icon={faFile} />
                                                                        </a>
                                                                    </div>
                                                                }
                                                        </td>
                                                        <td className='border border-grey-100 text-center w-14'>
                                                            <div onClick={(_) => hapusKelas(data.id)} className='hover:cursor-pointer text-center w-7 m-1 p-1 rounded-md text-white text-xs bg-red-500'>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))

                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className='container border'>
                                <div className="flex items-center">
                                    <p className='p-2 text-sm font-bold'>Tambah Data Kelas</p>
                                </div>
                                <div className="p-2 gap-2">
                                    <form onSubmit={handlerSimpan}>
                                        <div className="mt-2 mb-2">
                                            <InputLabel htmlFor="Kelas" value="Kelas" />
                                            <select
                                            id='kelas'
                                            name='kelas'
                                            value={kelass}
                                            className='w-full rounded-md border-gray-300'
                                            onChange={handleChangeValue}
                                            >
                                                <option value="100">-PILIH-</option>
                                                {
                                                kelas.map((data, index) => (
                                                    <option value={index} key={index}>{data.materi} - {data.jenis} - {IDR.format(data.harga)}</option>
                                                ))
                                                }
                                            </select>
                                        </div>

                                        <div className="mt-2 mb-2">
                                            <InputLabel htmlFor="Harga" value="Harga" />
                                            <TextInput type="text" readOnly value={IDR.format(harga)} className="w-full" />

                                        </div>
                                        <div className="flex items-center justify-end mt-2">
                                            <PrimaryButton type="submit">Simpan</PrimaryButton>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show}>
                    <div className="w-full bg-grey-200 p-3">
                        <div className="flex justify-between mb-3">
                            <p className='text-lg'>History Booking </p>
                            <div>
                                <button className='w-8 h-8 border border-blue-300 rounded-full bg-blue-300 hover:bg-blue-100 text-white' onClick={(e) => handlerModalClose()}>x</button>
                            </div>
                        </div>
                        <div>
                            <table className="w-full p-4">
                                <thead>
                                    <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                        <th>No</th>
                                        <th>Tanggal</th>
                                        <th>Jam</th>
                                        <th>Kelas</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        modalbooking.length < 1  ? (
                                            <tr>
                                                <td colSpan={5} className='text-center'>
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
                                        ) : (
                                            modalbooking.map((data, i) => (
                                                <tr key={i} className='text-sm'>
                                                    <td className='border border-grey-100 p-1'>{i+1}</td>
                                                    <td className='border border-grey-100 p-1'>{data.tanggal}</td>
                                                    <td className='border border-grey-100 p-1'>{data.jam}</td>
                                                    <td className='border border-grey-100 p-1'>{data.materi}</td>
                                                    <td className='border border-grey-100 p-1'>{data.status}</td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            </Modal>

            <Modal show={show1}>
                    <div className="w-full bg-grey-200 p-3">
                        <div className="flex justify-between mb-3">
                            <p className='text-lg'>History Absen </p>
                            <div>
                                <button className='w-8 h-8 border mr-5 border-green-300 rounded-full bg-green-500 hover:bg-green-300 text-white' onClick={() => handlerAbsen()}>+</button>
                                <button className='w-8 h-8 border border-blue-300 rounded-full bg-blue-300 hover:bg-blue-100 text-white' onClick={(e) => handlerModalClose1()}>x</button>
                            </div>
                        </div>
                        <div>
                            <table className="w-full p-4">
                                <thead>
                                    <tr className='[&>th]:p-2 bg-slate-800 text-white'>
                                        <th>No</th>
                                        <th>Tanggal</th>
                                        <th>Jam</th>
                                        <th>Kelas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        modalabsen.length < 1  ? (
                                            <tr>
                                                <td colSpan={5} className='text-center'>
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
                                        ) : (
                                            modalabsen.map((data, i) => (
                                                <tr key={i} className='text-sm'>
                                                    <td className='border border-grey-100 p-1'>{i+1}</td>
                                                    <td className='border border-grey-100 p-1'>{data.tanggal}</td>
                                                    <td className='border border-grey-100 p-1'>{data.jam}</td>
                                                    <td className='border border-grey-100 p-1'>{data.materi}</td>
                                                </tr>
                                            ))
                                        )

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            </Modal>

            <Modal show={show2}>
                    <div className="w-full bg-grey-200 p-3">
                        <div className="flex justify-between mb-3">
                            <p className='text-lg'>Sertifikat</p>
                            <div>
                                <button className='w-8 h-8 border border-blue-600 rounded-full bg-blue-600 hover:bg-blue-100 text-white' onClick={(e) => handlerModalClose2()}>x</button>
                            </div>
                        </div>
                        <div>
                            <div className="border-black border-2 border-dotted p-3">
                                <p className='text-yellow-600'>Pastikan Member sudah melengkapi data sebagai berikut.!!</p>
                                <hr />
                                <p className='mt-3 text-gray-400'>Mengikuti / sudah follow linkedin mediatama web.!</p>
                                <div className='flex mt-3'>
                                    <FontAwesomeIcon className='text-blue-400 text-xl' icon={faLinkedin}/>
                                    <p className={`${linkeds ? '' : 'hidden '} ml-3`}>Linkedin OK</p>
                                    <p className={`${linkeds ? 'hidden' : ''} ml-3 `}>File Not Found</p>
                                    <FontAwesomeIcon id='linkedofff' className={`${linkeds ? '' : 'hidden '} text-green-400 ml-3 text-xl`} icon={faCheck}/>
                                    <FontAwesomeIcon id='linkedonn' className={`${linkeds ? 'hidden' : ''} text-red-400 ml-3 text-xl`} icon={faCancel}/>
                                </div>
                                <p className='mt-1 text-gray-400'>Sudah mengupload file cv pada aplikasi booking mediatama web.!</p>
                                <div className='flex mt-3'>
                                    <FontAwesomeIcon className='text-blue-400 text-xl' icon={faFileArchive}/>
                                    <p className={`${cvs ? '' : 'hidden '} ml-3`}>Cv OK</p>
                                    <p className={`${cvs ? 'hidden' : ''} ml-3`}>File Not Found</p>
                                    <FontAwesomeIcon className={`${cvs ? '' : 'hidden'}  text-green-400 ml-3 text-xl`} icon={faCheck}/>
                                    <FontAwesomeIcon className={`${cvs ? 'hidden' : ''} text-red-400 ml-3 text-xl`} icon={faCancel}/>
                                </div>
                                <p className='mt-1 text-gray-400'>Jika semua file pendukung sudah terpenuhi silahkan klik tombol dibawah untuk mengenerate sertifikat.</p>
                                <div className="flex justify-center mt-3">
                                    <button onClick={(_) => handlerGenerate()} className='bg-blue-600 hover:bg-blue-400 p-1 rounded-md text-white w-1/2' type="button">Generate</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </Modal>

            </AuthenticatedLayout>
    )
}
