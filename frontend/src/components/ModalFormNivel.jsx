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
    Select,
    Box,
  } from "@chakra-ui/react";
  import { useEffect,useState } from "react";
  
  
  const ModalFormNivel = ({ data, setData, dataEdit, isOpen, onClose, notify }) => {
            
    const [id, setId] = useState(dataEdit.id || "");
    const [nivel, setNivel] = useState(dataEdit.nivel || "");






  
    const handleSave = () => {
        fetch("http://localhost:8080/api/niveis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nivel
            }),
        })
            .then((res) => res.json())
            .then((result) => {                
                setData([...data, result.data]);
                notify("Nivel cadastrado com sucesso!")
            });
  
      onClose();
    };

    const handleUpdate = () => {
        fetch(`http://localhost:8080/api/niveis/${dataEdit.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               nivel
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const index = data.findIndex((item) => item.id === result.data.id);
                data[index] = result.data;
                setData([...data]);
                notify("Desenvolvedor atualizado com sucesso!")
            });
  
      onClose();
    }
  

  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastro de Niveis</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl display="flex" flexDir="column" gap={4}>
                <Box>
                  <FormLabel>Nivel</FormLabel>
                  <Input
                    type="text"
                    value={nivel}
                    onChange={(e) => setNivel(e.target.value)}
                  />
                </Box>                
              </FormControl>
            </ModalBody>
  
            <ModalFooter justifyContent="start">
                {dataEdit.id ? (
                        <Button colorScheme="blue" onClick={handleUpdate}>
                            ATUALIZAR
                        </Button>
                    ) : (
                        <Button colorScheme="blue" onClick={handleSave}>
                            SALVAR
                        </Button>
                    )
                }
            
              <Button colorScheme="red" onClick={onClose}>
                CANCELAR
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalFormNivel;