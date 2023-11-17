import { 
    Button, 
    useDisclosure,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    ModalFooter,
    Text,
    Link,
    } from '@chakra-ui/react'
import axios from 'axios';

interface DeleteCashierProps {
    id: number;
    username: string;
    onCashierDeleted: () => void;
}

function DeleteCashier({id, username, onCashierDeleted}: DeleteCashierProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const token = localStorage.getItem("token");

  
  
  const deleteCashier = async () => {
    try{ 
      await axios.delete(`http://localhost:8080/user/deletecashier/${id}`
    , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );

    alert("Delete cashier is successful")
    onCashierDeleted();
    onClose();
    } catch (err){
      console.log(err)
      alert("Delete cashier failed")
    }
  };


  return (
    <>
        <Link 
        onClick={onOpen}
        >
            <Text fontSize={'14px'} fontWeight={'400'} color={'#949494'}>Delete</Text>
                <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    <Text>Are you sure want to delete {username} as cashier?</Text>
                      
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme='red' mr={3} onClick={deleteCashier}>
                        Delete
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

        </Link>
    </>
  )
}

export default DeleteCashier

