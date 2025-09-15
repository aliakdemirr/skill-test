const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent, deleteStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const allStudent = await getAllStudents(req.query);
    res.status(200).json(allStudent);
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const newStudent = await addNewStudent(req.body);
    res.status(201).json(newStudent);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const updatedStudent = await updateStudent(req.params.id, req.body);
    res.status(200).json(updatedStudent);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const student = await getStudentDetail(req.params.id);
    res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const userId = req.params.id;
    const reviewerId = req.user?.id || 1; // Assuming req.user contains authenticated user info

    const result = await setStudentStatus({ userId, reviewerId, status });
    res.status(200).json(result);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    const result = await deleteStudent(req.params.id);
    res.status(200).json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent
};