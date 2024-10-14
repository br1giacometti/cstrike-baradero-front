// TableContent.tsx
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { BaseColumn } from "Base/components/DataTable";

interface TableContentProps<T> {
  data: T[];
  columns: BaseColumn<T>[];
  loading: boolean;
}

const TableContent = <T,>({ data, columns, loading }: TableContentProps<T>) => (
  <Box bg="gray.800" borderRadius="md" boxShadow="lg" p={4}>
    <Table variant="simple" colorScheme="whiteAlpha">
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th key={column.label} color="white" bg="gray.500">
              {column.label}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {loading ? (
          <Tr>
            <Td colSpan={columns.length} textAlign="center" color="gray.400">
              Cargando...
            </Td>
          </Tr>
        ) : (
          data.map((row, index) => (
            <Tr key={index} bg={index % 2 === 0 ? "gray.700" : "gray.800"}>
              {columns.map((column, colIndex) => (
                <Td key={colIndex} color="white">
                  {column.selector(row)}
                </Td>
              ))}
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  </Box>
);

export default TableContent;
