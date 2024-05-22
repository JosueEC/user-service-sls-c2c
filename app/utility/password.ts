import bcrypt from 'bcrypt';

export const getSalt = async () => await bcrypt.genSalt();

export const getHashedPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

export const validatePassword = async (
    enteredPassword: string,
    savedPassword: string,
    salt: string,
) => {
    return (await getHashedPassword(enteredPassword, salt)) === savedPassword;
};