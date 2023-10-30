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

function sch (schema){
    return yup.object().shape(schema);
}



const schemas = {
    loginSchema : sch({
        email: yup.string().email().required("Email is required"),
        password: yup.string().required("Password is required"),
    }),

    registerSchema : sch({
        email: yup.string().email().required("Email is required"),
        password: yup.string().required("Password is required"),
        username: yup.string().required("Username is required"),
    }),

    updateUserDataSchema : sch({
        newPassword: yup.string(),
        oldPassword: yup.string(),
        username: yup.string(),
        fullName: yup.string(),
        email: yup.string().email(),
        isDisabled: yup.boolean(),
        userId: yup.string().required("User id is required"),
    }),

    createTweetSchema : sch({
        userId: yup.string().required("User id is required"),
        content: yup.string().required("Content is required"),
        attachmentUrls: yup.array().of(yup.string()),
        mentions: yup.array().of(yup.string()),
        hashtags: yup.array().of(yup.string()),
        
        
    }),

    likeSchema : sch({
        userId: yup.string().required("User id is required"),
        tweetId: yup.string().required("Post id is required"),
    }),



}
    



export default schemas;