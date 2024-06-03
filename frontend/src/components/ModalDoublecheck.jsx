import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const ModalDoubleCheck = ({  isOpen, onClose, handleDelete }) => {

  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
           
            <ModalCloseButton />
            <ModalBody>
                <FormControl display="flex" flexDir="column" gap={4}>
                    <Box>
                    <FormLabel>Tem certeza que deseja excluir?</FormLabel>
                    </Box>
                </FormControl>
            </ModalBody>
  
            <ModalFooter justifyContent="start">
              <Button colorScheme="green" mr={3} onClick={handleDelete}>
                Excluir
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                CANCELAR
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalDoubleCheck;