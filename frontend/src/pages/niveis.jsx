import React, { useEffect, useState } from "react";
import { Box, Flex, Spacer, Button,  useDisclosure } from '@chakra-ui/react';
import CustomTable from "../components/Table";
import { toast, ToastContainer } from 'react-toastify';
import ModalFormNivel from "../components/ModalFormNivel";



const Nivel = () => {
    const [data, setData] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [dataEdit, setDataEdit] = useState({});

    useEffect(() => {
      console.log(import.meta.env.VITE_REACT_APP_URL_API);
        fetch(import.meta.env.VITE_REACT_APP_URL_API+"/niveis")
            .then((res) => res.json())
            .then((data) => setData(data.data));
    }, [setData]);

    const columns = React.useMemo(
        () => [
        { Header: "ID", accessor: "id" },
        { Header: "Nivel", accessor: "nivel" },
        { Header: "Desenvolvedores", accessor: "total_desenvolvedores" },
        ], []);

    const handleUpdate = (data) => {            
        setDataEdit(data);
        onOpen();
    };

    const handleDelete = (item) => {
        fetch(import.meta.env.VITE_REACT_APP_URL_API+`/niveis/${item.id}`, {
            method: "DELETE",
        })
            .then(() => {
            const newData = data.filter((d) => d.id !== item.id);
            setData(newData);
            notify("Nivel removido com sucesso!");
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
        <ModalFormNivel
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

export default Nivel;