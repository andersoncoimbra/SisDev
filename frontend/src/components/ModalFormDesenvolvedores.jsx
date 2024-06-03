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
  
  
  const ModalFormDesenvolvedores = ({ data, setData, dataEdit, isOpen, onClose, notify }) => {
            
    const [id, setId] = useState(dataEdit.id || "");
    const [nome, setNome] = useState(dataEdit.nome || "");
    const [sexo, setSexo] = useState(dataEdit.sexo || "");
    const [data_nascimento, setData_nascimento] = useState(dataEdit.data_nascimento || "");
    const [nivel_id, setNivel] = useState(dataEdit.nivel || "");
    const [hobby, setHobby] = useState(dataEdit.hobby || "");

    const [niveis, setNiveis] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/niveis")
            .then((res) => res.json())
            .then((data) => setNiveis(data.data));
    }, [setNiveis]);

  
    const handleSave = () => {
        fetch("http://localhost:8080/api/desenvolvedores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                sexo,
                data_nascimento,
                nivel_id,
                hobby,
            }),
        })
            .then((res) => res.json())
            .then((result) => {                
                setData([...data, result.data]);
                notify("Desenvolvedor cadastrado com sucesso!")
            });
  
      onClose();
    };

    const handleUpdate = () => {
        fetch(`http://localhost:8080/api/desenvolvedores/${dataEdit.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                sexo,
                data_nascimento,
                nivel_id,
                hobby,
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
            <ModalHeader>Cadastro de Desenvolvedores</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl display="flex" flexDir="column" gap={4}>
                <Box>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Sexo</FormLabel>
                  <Select value={sexo} onChange={(e) => setSexo(e.target.value)} placeholder="Selecione o seu sexo">
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </Select>
                </Box>
                <Box>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <Input
                    type="date"
                    value={data_nascimento}
                    onChange={(e) => setData_nascimento(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Nível</FormLabel>
                  <Select value={nivel_id} onChange={(e) => setNivel(e.target.value)} placeholder="Selecione o nivel">                    
                    {niveis.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nivel}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <FormLabel>Hobby</FormLabel>
                  <Input
                    type="text"
                    value={hobby}
                    onChange={(e) => setHobby(e.target.value)}
                    size='lg'
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
  
  export default ModalFormDesenvolvedores;