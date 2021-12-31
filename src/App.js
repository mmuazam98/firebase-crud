import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

import styled, { keyframes } from "styled-components";

const CenteredDiv = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
`;
const Button = styled.button`
  border: none;
  outline: none;
  background: ${(props) => props.backgroundColor || "black"};
  padding: 10px;
  color: white;
  border-radius: 10px;

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 10px;
`;

const Table = styled.table`
  width: 75%;
  margin: 0 auto;
  table-layout: fixed;
  overflow-x: auto;
  margin-top: 0px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-collapse: collapse;
`;

const TableHeadings = styled.th`
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
`;

const TableData = styled.td`
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 12px;
  color: #fff;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
`;
const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const LoadingDiv = styled.div`
  border: 2px dotted white;
  border-top-color: white;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  animation: ${rotate} 4s linear infinite;
`;

const Loader = ({ show }) => {
  return (
    <Overlay show={show}>
      <LoadingDiv />
    </Overlay>
  );
};

const App = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    getUsers();
    setNewAge(0);
    setNewName("");
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  const getUsers = async () => {
    setShow(true);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setShow(false);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <Loader show={show} />
      <CenteredDiv>
        <Input
          placeholder="Name..."
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          value={newName}
        />
        <Input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setNewAge(event.target.value);
          }}
          value={newAge}
        />
        <Button onClick={createUser}> Create User</Button>
      </CenteredDiv>

      <Table>
        <thead>
          <TableHeadings>Name</TableHeadings>
          <TableHeadings>Age</TableHeadings>
          <TableHeadings>Actions</TableHeadings>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <TableData>{user.name}</TableData>
              <TableData>{user.age}</TableData>
              <TableData>
                <Button
                  onClick={() => {
                    updateUser(user.id, user.age);
                  }}
                  backgroundColor="green"
                >
                  Increase Age
                </Button>{" "}
                <Button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                  backgroundColor="red"
                >
                  Delete User
                </Button>
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default App;
