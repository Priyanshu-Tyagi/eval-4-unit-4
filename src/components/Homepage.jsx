import { Button, ButtonGroup, Stack } from '@chakra-ui/react'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,FormControl,FormLabel,Input,useDisclosure,Select} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { addHospitals, getHospitals, addDoctors, getDoctors } from './api'

export default function HomePage(){
    const { isOpen:isHosOpen, onOpen:onHosOpen, onClose:onHosClose } = useDisclosure()
    const { isOpen:isDocOpen, onOpen:onDocOpen, onClose:onDocClose } = useDisclosure()
    const [hosName,setHosName] = useState("");
    const [hosData,setHosData] = useState([]);
    // const [doc,setDoc] = useState([{doctorname:"",hospital:"",Specialisation:"",salary:0}]);
    const [doctorname,setdoctorname] = useState("")
    const [hospital,sethospital] = useState("");
    const [Specialisation,setSpecialisation] = useState("");
    const [salary,setSalary] = useState(0);
    const [docData,setDocData] = useState([]);

    function handleAddHospital(hospitalname){
        addHospitals({
            hospitalname
        })
    }

    function handleAddDoctors(doctorname,hospital,Specialisation,salary){
        addDoctors({doctorname,hospital,Specialisation,salary})
    }

    function handleGetHospital(){
        getHospitals()
        .then((res)=>{setHosData(res.data)})
        .catch((err)=>console.log("Error"))
    }

    useEffect(()=>{
        handleGetHospital();
        console.log(hosData)
    },[]);

    function handleGetDoctor(){
        getDoctors()
        .then((ress)=>{setDocData(ress.data)})
        .catch((err)=>console.log("Error"))
    }

    useEffect(()=>{
        handleGetDoctor();
        console.log(docData)
    },[setDocData]);

    return (

        <div style={{width:"45%",margin:"auto",marginTop:"40vh"}}>
            <Stack direction='row' spacing={4} align='center' >
                <Button onClick={onHosOpen} colorScheme='red' variant='solid'>
                    Add Hospltal
                </Button>
                <Button onClick={onDocOpen} colorScheme='teal' variant='outline'>
                    Add Doctor
                </Button>
            </Stack>

            {/* Modal for Hospital */}
            
            <Modal isOpen={isHosOpen} onClose={onHosClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add Hospital</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form id="hospitalform" onSubmit={(e)=>{e.preventDefault();console.log(hosName);handleAddHospital(hosName)}}>
                        <FormControl>
                            <FormLabel>Hospital Name</FormLabel>
                            <Input type={"text"} value={hosName} onChange={(e)=>setHosName(e.target.value)} />
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onHosClose}>
                    Close
                    </Button>
                    <Button type="submit" form='hospitalform' variant='outline' colorScheme='blue'>Submit</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal for Doctors */}

            <Modal isOpen={isDocOpen} onClose={onDocClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add Doctor</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form id="doctorform" onSubmit={(e)=>{e.preventDefault();handleAddDoctors(doctorname,hospital,Specialisation,salary);console.log(doctorname,hospital,Specialisation,salary)}}>
                        <FormControl>
                            <FormLabel>Doctor's Name</FormLabel>
                            <Input type={"text"} value={doctorname} onChange={(e)=>setdoctorname(e.target.value)} />
                            <FormLabel>Select Hospital  </FormLabel>
                            <Select placeholder='Select Hospital' onChange={(e)=>sethospital(e.target)}>
                                {hosData.map((item)=>(<option key={item.id} value={item.hospitalname}  >{item.hospitalname}</option>))}
                            </Select>
                            <FormLabel>Specialisation</FormLabel>
                            <Input type={"text"} value={Specialisation} onChange={(e)=>setSpecialisation(e.target.value)} />
                            <FormLabel>Salary</FormLabel>
                            <Input type={"number"} value={salary} onChange={(e)=>setSalary(e.target.value)} />
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onDocClose}>
                    Close
                    </Button>
                    <Button type="submit" form='doctorform' variant='outline' colorScheme='blue'>Submit</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>


            <div>
                {docData.map((i)=>(<div style={{display:"flex",gap:"3rem"}}>
                    <div>{i.id}</div>
                    <div>{i.doctorname}</div>
                    <div>{i.hospital}</div>
                    <div>{i.Specialisation}</div>
                    <div>{i.salary}</div>
                </div>))}
            </div>
        </div>
    )
}