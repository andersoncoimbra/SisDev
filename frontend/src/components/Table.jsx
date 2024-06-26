import React, {  useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Flex, Text, IconButton, Tooltip, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useDisclosure} from "@chakra-ui/react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
    EditIcon,
    DeleteIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    ChevronDownIcon,
    ChevronUpIcon
  } from "@chakra-ui/icons";
import ModalDoubleCheck from "./ModalDoublecheck";


function CustomTable({ columns, data, edit, remove }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [itemSelected, setItemSelected] = useState({});

    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, 
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize }
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 }
      },
      useSortBy,
      usePagination
    );

    const doubleCheck = (data) => {
       setItemSelected(data);
       onOpen();
    }

    const removeItem = () => {
        remove(itemSelected);
        onClose();
    }
  
    // Render the UI for your table
    return (
      <>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
                    {column.canSort ? (
                        <span>
                        {column.isSorted ? (column.isSortedDesc ? <ChevronDownIcon/> : <ChevronUpIcon/>) : ""}
                       
                        </span>
                    ) : null}
                  </Th>               
                
                ))}
                <Th>Ações</Th>
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                   <Td>
                        <EditIcon
                        fontSize={20}
                        onClick={() => {
                            edit(row.original);
                        }}
                        /> 
                        <DeleteIcon
                        fontSize={20}
                        onClick={() => {
                            doubleCheck(row.original)
                        }}
                        />
                    </Td>                                     
                </Tr>
              );
            })}

          </Tbody>
        </Table>
  
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex>
            <Tooltip label="First Page">
              <IconButton
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>
  
          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Pagina{" "}
              <Text fontWeight="bold" as="span">
                {pageIndex + 1}
              </Text>{" "}
              de{" "}
              <Text fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Text>
            <Text flexShrink="0">Ir até a pagina:</Text>{" "}
            <NumberInput
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={pageOptions.length}
              onChange={(value) => {
                const page = value ? value - 1 : 0;
                gotoPage(page);
              }}
              defaultValue={pageIndex + 1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              w={32}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </Select>
          </Flex>
  
          <Flex>
            <Tooltip label="Next Page">
              <IconButton
                onClick={nextPage}
                isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex>
        <ModalDoubleCheck isOpen={isOpen} onClose={onClose} handleDelete={removeItem} />
      </>
    );
  }

export default CustomTable;