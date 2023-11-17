import { Box, Flex, Icon, Image, Text, Link, Divider, 
    // useDisclosure 
} from "@chakra-ui/react";
// import { SidebarWithHeader } from "../../components/SideBar/SideBar";
import cashier1 from "../../assets/cashier1.png"
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import { useState, useEffect } from "react";
import AddCashier from "../../components/AddCashier/AddCashier";
import UpdateCashier from "../../components/UpdateCashier/UpdateCashier";
import DeleteCashier from "../../components/DeleteCashier/DeleteCashier";

function Cashier() {

    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const [userId, setUserId] = useState<number | undefined>(undefined);
    const token = localStorage.getItem("token");

    interface Cashier{
        id: number;
        email: string;
        username: string;
        type: string;
        status: string;
    }

    const [cashier, setCashier] = useState<Cashier[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCashiers = cashier?.slice(indexOfFirstItem, indexOfLastItem);

    const fetchCashier = async () => {
        try{
            const response = await axios.get("http://localhost:8080/user/cashier"
            , {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            setCashier(response.data?.data);
        } catch (err){
            console.log(err)
        }
    };
    
    useEffect (() => {
        fetchCashier();
    }, [])

    console.log(cashier);
    
  return (
    <Box>
        {/* <SidebarWithHeader/> */}
        <Flex width={'1216px'}
        justifyContent={'space-between'}
        alignItems={'center'}>
            <Flex gap={'10px'}>    
                <Text color={'#949494'}>Last Updated</Text>
                <Text>17 November 2023 01:37 PM</Text>
            </Flex>

            <Box>
                <AddCashier onCashierAdded={fetchCashier}/>
            </Box>
        </Flex>

        
        <Flex width={'1216px'}
        alignItems={'flex-start'}
        gap={'24px'}
        flexWrap={'wrap'}
        marginTop={'46px'}
        marginBottom={'60px'}
        >
            {currentCashiers?.map((item, index) => (
            <Flex className="cashier-container" alignItems={'center'}
            gap={'24px'}
            flex={'1 0 calc(25% - 24px)'}
            borderRadius={'16px'}
            background={'#FFFFFF'}
            boxShadow={'base'}
            maxWidth={'286px'} key={index}>
                <Box width={'10px'}
                height={'80px'}
                backgroundColor={'#9ED6A3'}
                borderRadius={'0px 14px 14px 0px'}></Box>

                <Flex padding={'24px 0px'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'flex-start'}
                gap={'24px'}
                >
                    <Flex justifyContent={'center'}
                    alignItems={'center'}
                    gap={'16px'}>
                        <Image boxSize={'64px'}
                        borderRadius={'full'}
                        src={cashier1}/>
                        <Flex flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'flex-start'}
                        gap={'8px'}>
                            <Flex alignItems={'center'}
                            gap={'8px'}>
                                <Icon as={FaStar} color={'#F2C139'} fontSize={'24px'}/>
                                <Text fontSize={'14px'} fontWeight={'400'}>{item.username}</Text>
                            </Flex>
                            <Flex alignItems={'center'}
                            gap={'8px'}>
                                <Text fontSize={'14px'} fontWeight={'400'} color={'#949494'}> {item.type}  |</Text>
                                <Text fontSize={'14px'} fontWeight={'400'} color={'#9ED6A3'}>{item.status}</Text>
                            </Flex>
                            <Flex alignItems={'center'}
                            gap={'8px'}>
                                    <UpdateCashier id = {item.id} 
                                    email = {item.email} 
                                    username = {item.username} type = {item.type} status = {item.status}/>
                                    <DeleteCashier id={item.id} username = {item.username} onCashierDeleted={fetchCashier}/>
                            </Flex>
                                
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            ))}
        </Flex>

        <Box>
        
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</button>
                <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}>Previous</button>
                {/* Additional pagination controls here */}
                <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === Math.ceil(cashier?.length / itemsPerPage)}>Next</button>
                <button onClick={() => setCurrentPage(Math.ceil(cashier?.length / itemsPerPage))}>Last</button>
        
        </Box>
        {/* <UpdateCashier userId={userId} isOpen={isOpen} onClose={onClose} /> */}
        <Box><Divider/></Box>
        <Flex width={'1216px'}
        alignItems={'flex-start'}
        gap={'24px'}
        flexWrap={'wrap'}
        marginTop={'60px'}>
            <Flex className="cashier-container" alignItems={'center'}
            gap={'24px'}
            flex={'1 0 calc(25% - 24px)'}
            borderRadius={'16px'}
            background={'#FFFFFF'}
            boxShadow={'base'}
            maxWidth={'286px'}>
                <Box width={'10px'}
                height={'80px'}
                backgroundColor={'#D9D9D9'}
                borderRadius={'0px 14px 14px 0px'}></Box>

                <Flex padding={'24px 0px'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'flex-start'}
                gap={'24px'}
                >
                    <Flex justifyContent={'center'}
                    alignItems={'center'}
                    gap={'16px'}>
                        <Image boxSize={'64px'}
                        borderRadius={'full'}
                        src={cashier1}/>
                        <Flex flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'flex-start'}
                        gap={'8px'}>
                            <Flex alignItems={'center'}
                            gap={'8px'}>
                                <Icon as={FaStar} color={'#D9D9D9'} fontSize={'24px'}/>
                                <Text fontSize={'14px'} fontWeight={'400'} color={'#949494'}>Cashier Name</Text>
                            </Flex>
                            <Flex alignItems={'center'}
                            gap={'8px'}>
                                <Text fontSize={'14px'} fontWeight={'400'} color={'#949494'}>Full-Time   |</Text>
                                <Text fontSize={'14px'} fontWeight={'400'} color={'#949494'}>Inactive</Text>
                            </Flex>
                            <Flex alignItems={'center'}
                            gap={'8px'}>
                                <Link backgroundColor={'transparent'}>
                                    <Text fontSize={'14px'} fontWeight={'400'} color={'#949494'}>Edit</Text>
                                </Link>
                                <Link>
                                    <Text fontSize={'14px'} fontWeight={'400'} color={'#949494'}>Delete</Text>
                                </Link>
                            </Flex>
                                
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    </Box>
  )
}

export default Cashier