import {
  Box,
  Flex,
  Spacer,
  Button,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ModalFormDesenvolvedores from "../components/ModalFormDesenvolvedores";
import CustomTable from "../components/Table";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Desenvolvedores = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_URL_API+"/desenvolvedores")
        .then((res) => res.json())
        .then((data) => setData(data.data));
  }, [setData]);


  const columns = React.useMemo(
    () => [
    { Header: "ID", accessor: "id" },
    { Header: "Nome", accessor: "nome" },
    { Header: "Sexo", accessor: "sexo" },
    { Header: "Idade", accessor: "idade" },
    { Header: "Nivel", accessor: "nivel.nivel" },
    { Header: "Hobby", accessor: "hobby" },    
    ], []);


    const handleUpdate = (data) => {
        data.nivel = data.nivel.id;
        setDataEdit(data);
        onOpen();
    };

   

    const handleDelete = (item) => {
        fetch(import.meta.env.VITE_REACT_APP_URL_API+`/desenvolvedores/${item.id}`, {
            method: "DELETE",
        })
          .then(() => {
            const newData = data.filter((d) => d.id !== item.id);
            setData(newData);
            notify("Desenvolvedor removido com sucesso!");
        });
    }

    const notify = (message) => toast.success(message, {
        position: "top-center"
      });

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box  w="100%" h="100vh" py={10} px={2}>
        <Flex>
          <Spacer />
          <Button  colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
            NOVO CADASTRO
          </Button>
        </Flex>

        <Box overflowY="auto" height="100%">
            <CustomTable columns={columns} data={data} edit={handleUpdate} remove={handleDelete} />
        </Box>
      </Box>
      <ToastContainer />
      {isOpen && (
        <ModalFormDesenvolvedores
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          notify={notify}
        />
      )}
      
    </Flex>
  );
};

export default Desenvolvedores;