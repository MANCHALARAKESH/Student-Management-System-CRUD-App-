import axiosInstance from "../../utils/axiosInstance";

const getStudents = async () => {
  const response = await axiosInstance.get("/getAll");
  return response.data;
};

const addStudent = async (studentData) => {
  const response = await axiosInstance.post("/addStudent", studentData);
  return response.data;
};

const deleteStudent = async (id) => {
  const response = await axiosInstance.delete(`/deleteStudent/${id}`);
  return response.data;
};

const updateStudent = async (id, data) => {
  const response = await axiosInstance.put(`/updateStudent/${id}`, data);
  return response.data;
};

export default {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
};
