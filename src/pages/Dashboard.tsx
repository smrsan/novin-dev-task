import { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";
import { type IUserData } from "../types";
import DeleteDialog from "../dialogs/DeleteDialog";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState<IUserData[]>([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);
  // const [totalPages, setTotalPages] = useState(0);
  const [userToDelete, setUserToDelete] = useState<IUserData | undefined>();

  const handlePageChange = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleDelUser = useCallback(
    (usr: IUserData) => () => {
      setUserToDelete(usr);
    },
    []
  );

  const loadPageData = useCallback(async () => {
    setIsLoading(true);

    const res = await fetch(`https://reqres.in/api/users?page=${page + 1}`, {
      cache: "no-cache",
    });
    const result = await res.json();

    setUsersList(result.data);
    setPerPage(result.per_page);
    setTotal(result.total);
    // setTotalPages(result.total_pages);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading &&
              Array.from({ length: perPage || 1 }).map((_, i) => (
                <TableRow key={i} hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Skeleton variant="circular" width={40} height={40} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading &&
              usersList.map((usr) => (
                <TableRow key={usr.id} hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Avatar alt={usr.email} src={usr.avatar} />
                  </TableCell>
                  <TableCell>{usr.first_name}</TableCell>
                  <TableCell>{usr.last_name}</TableCell>
                  <TableCell>{usr.email}</TableCell>
                  <TableCell>
                    <Button color="error" onClick={handleDelUser(usr)}>
                      Del
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[perPage]}
        component="div"
        count={total}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handlePageChange}
      />
      <DeleteDialog
        userToDelete={userToDelete}
        onClose={() => setUserToDelete(undefined)}
      />
    </>
  );
};

export default Dashboard;
