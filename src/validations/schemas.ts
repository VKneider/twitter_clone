import yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const registerSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    username: yup.string().required("Username is required"),
});

const updateUserDataSchema = yup.object().shape({
    newPassword: yup.string(),
    username: yup.string(),
    email: yup.string().email(),
    oldPassword: yup.string(),
    userId: yup.string().required("User id is required"),
});

const idSchema = yup.object().shape({
    userId: yup.string().required("Id is required"),
});

const byFolderIdSchema = yup.object().shape({
    folderId: yup.string().required("Folder id is required"),
    userId: yup.string().required("User id is required"),
});

const createNoteSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("description is required"),
    folderId: yup.string().nullable(),
    userId: yup.string().required("User is required"),
});

const updateNoteSchema = yup.object().shape({
    noteId: yup.string().required("Note id is required"),
    title: yup.string(),
    description: yup.string(),
    color: yup.string(),
    trashed: yup.boolean(),
    starred: yup.boolean(),
    userId: yup.string().required("User id is required"),
});

const deleteNoteSchema = yup.object().shape({
    noteId: yup.string().required("Note id is required"),
    userId: yup.string().required("User id is required"),
});

const createFolderSchema = yup.object().shape({
    name: yup.string().required("Folder name is required"),
    userId: yup.string().required("User id is required"),
});

const updateFolderSchema = yup.object().shape({
    folderId: yup.string().required("Folder id is required"),
    name: yup.string(),
    userId: yup.string()
});

const deleteFolderSchema = yup.object().shape({
    folderId: yup.string().required("Folder id is required"),
    userId: yup.string().required("User id is required"),
});



const schemas = {
    loginSchema,
    registerSchema,
    updateUserDataSchema,
    idSchema,
    byFolderIdSchema,
    createNoteSchema,
    updateNoteSchema,
    deleteNoteSchema,
    createFolderSchema,
    updateFolderSchema,
    deleteFolderSchema

}

export default schemas;